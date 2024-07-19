from sqlalchemy.orm import Session
from app.models import User
from app.schemas import UserCreate

def create_user(db: Session, user: UserCreate):
    db_user = User(username=user.username, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()
