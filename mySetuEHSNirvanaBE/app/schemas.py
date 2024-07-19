from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TokenData(BaseModel):
    username: str | None = None

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    target_date: datetime

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        orm_mode = True
