# TaskFlow

A clean and responsive task management application designed to help users organize tasks, prioritize work, track deadlines, and monitor progress.

TaskFlow uses a lightweight vanilla JavaScript frontend with a FastAPI backend and PostgreSQL database for production.

## 🚀 Live Demo

**Frontend:**  
https://task-tracker-1b62-5azf3la6c-ishrath2224s-projects.vercel.app

**Backend API:**  
https://taskflow-api-xntg.onrender.com

## ✨ Features

- Create, edit, complete, and delete tasks
- Set task priorities
- Organize tasks by category
- Set due dates
- Search and filter tasks
- Track active and completed tasks
- Identify overdue tasks
- Dashboard statistics
- Responsive and clean user interface
- Persistent database storage
- REST API architecture
- Production deployment with Vercel and Render

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database
- SQLite for local development
- PostgreSQL for production

### Deployment
- Vercel — Frontend
- Render — Backend & PostgreSQL

## 📁 Project Structure

```text
taskflow/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── .env.example
│   ├── render.yaml
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── .gitignore
└── README.md
