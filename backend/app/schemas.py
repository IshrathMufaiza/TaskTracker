from datetime import date,datetime
from pydantic import BaseModel,ConfigDict,Field
class TaskBase(BaseModel):
    title:str=Field(min_length=1,max_length=200)
    description:str=""
    priority:str="medium"
    category:str="General"
    due_date:date|None=None
    completed:bool=False
class TaskCreate(TaskBase): pass
class TaskUpdate(BaseModel):
    title:str|None=Field(default=None,min_length=1,max_length=200)
    description:str|None=None
    priority:str|None=None
    category:str|None=None
    due_date:date|None=None
    completed:bool|None=None
class TaskOut(TaskBase):
    id:int
    created_at:datetime
    updated_at:datetime
    model_config=ConfigDict(from_attributes=True)
class Stats(BaseModel):
    total:int
    active:int
    completed:int
    overdue:int
