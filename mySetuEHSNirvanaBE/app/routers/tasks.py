from typing import List
from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from app.crud.tasks import create_task, get_tasks, get_task
from app.schemas import Task, TaskCreate
from app.auth import get_current_user
from app.database import get_db
from app.models import User
from app.crud.tasks import update_existing_task
from app.crud.tasks import delete_existing_task


router = APIRouter()

@router.post("/tasks", response_model=Task)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_task(db=db, task=task, user_id=current_user.id)

@router.get("/tasks", response_model=List[Task])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    tasks = get_tasks(db=db, skip=skip, limit=limit)
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
def read_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_task = get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_task = get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_existing_task(db=db, task_id=task_id, task=task)

@router.delete("/tasks/{task_id}", response_model=Task)
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_task = get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return delete_existing_task(db=db, task_id=task_id)
