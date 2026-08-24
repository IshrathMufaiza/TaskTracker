import os
from datetime import date
from fastapi import Depends,FastAPI,HTTPException,Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session
from .database import Base,engine,get_db
from .models import Task
from .schemas import Stats,TaskCreate,TaskOut,TaskUpdate
Base.metadata.create_all(bind=engine)
app=FastAPI(title="TaskFlow API",version="1.0.0")
origins=[o.strip() for o in os.getenv("CORS_ORIGINS","*").split(",") if o.strip()]
app.add_middleware(CORSMiddleware,allow_origins=origins if origins!=["*"] else ["*"],allow_credentials=origins!=["*"],allow_methods=["*"],allow_headers=["*"])
@app.get("/")
def root(): return {"message":"TaskFlow API is running"}
@app.get("/health")
def health(): return {"status":"ok"}
@app.get("/api/tasks",response_model=list[TaskOut])
def list_tasks(search:str="",status:str=Query("all",pattern="^(all|active|completed)$"),category:str="",db:Session=Depends(get_db)):
    stmt=select(Task)
    if search:
        p=f"%{search.strip()}%"; stmt=stmt.where((Task.title.ilike(p))|(Task.description.ilike(p)))
    if status=="active": stmt=stmt.where(Task.completed.is_(False))
    elif status=="completed": stmt=stmt.where(Task.completed.is_(True))
    if category and category!="All": stmt=stmt.where(Task.category==category)
    return db.scalars(stmt.order_by(Task.completed.asc(),Task.due_date.asc().nulls_last(),Task.created_at.desc())).all()
@app.get("/api/tasks/stats",response_model=Stats)
def stats(db:Session=Depends(get_db)):
    tasks=db.scalars(select(Task)).all(); today=date.today()
    return Stats(total=len(tasks),active=sum(not t.completed for t in tasks),completed=sum(t.completed for t in tasks),overdue=sum(not t.completed and t.due_date and t.due_date<today for t in tasks))
@app.post("/api/tasks",response_model=TaskOut,status_code=201)
def create(payload:TaskCreate,db:Session=Depends(get_db)):
    if payload.priority not in {"low","medium","high"}: raise HTTPException(400,"Invalid priority")
    task=Task(**payload.model_dump()); db.add(task); db.commit(); db.refresh(task); return task
@app.patch("/api/tasks/{task_id}",response_model=TaskOut)
def update(task_id:int,payload:TaskUpdate,db:Session=Depends(get_db)):
    task=db.get(Task,task_id)
    if not task: raise HTTPException(404,"Task not found")
    data=payload.model_dump(exclude_unset=True)
    if "priority" in data and data["priority"] not in {"low","medium","high"}: raise HTTPException(400,"Invalid priority")
    for k,v in data.items(): setattr(task,k,v)
    db.commit(); db.refresh(task); return task
@app.delete("/api/tasks/{task_id}",status_code=204)
def delete(task_id:int,db:Session=Depends(get_db)):
    task=db.get(Task,task_id)
    if not task: raise HTTPException(404,"Task not found")
    db.delete(task); db.commit()
