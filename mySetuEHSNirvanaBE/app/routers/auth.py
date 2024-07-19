from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schemas import UserCreate, User
from app.crud.user import create_user, get_user
from app.database import get_db
from app.auth import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_password_hash, verify_password, get_current_user

router = APIRouter()

@router.post("/register/")
async def register_user(username: str, password: str, db: Session = Depends(get_db)):
    db_user = get_user(db, username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(password)
    user = create_user(db=db, user=UserCreate(username=username, password=hashed_password))
    return {"message": "User registered successfully"}

@router.post("/token/")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username=username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
