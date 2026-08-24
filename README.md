# TaskFlow

A full-stack task manager built with vanilla JavaScript, FastAPI, SQLAlchemy, and PostgreSQL-ready database configuration.

## Features
- Create, edit, complete, and delete tasks
- Search and filter by status/category
- Priority levels and due dates
- Task statistics and overdue tracking
- Responsive interface
- REST API with automatic FastAPI documentation
- SQLite for zero-setup local development
- PostgreSQL-ready production setup

## Stack
Frontend: HTML, CSS, JavaScript
Backend: Python, FastAPI, SQLAlchemy
Database: SQLite locally / PostgreSQL in production
Server: Uvicorn

## Local setup
### Backend
```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```
Open http://localhost:8000/docs for interactive API documentation.

### Frontend
```bash
cd frontend
python -m http.server 5500
```
Open http://localhost:5500.

## Production
Set `DATABASE_URL` to PostgreSQL and `CORS_ORIGINS` to the deployed frontend URL. Use Uvicorn without `--reload` in production.

© 2026 TaskFlow. All rights reserved.
