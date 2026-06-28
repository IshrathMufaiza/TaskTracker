#  Task Tracker — MERN Stack

A full-stack task management app built with MongoDB, Express, React, and Node.js.

## Features

**Core (Mandatory)**
- Create, read, update, delete tasks (full CRUD)
- Form validation on both frontend and backend
- REST API with Express
- MongoDB via Mongoose
- Responsive UI (mobile + desktop)
- Dynamic updates — no page refreshes needed

**Bonus**
- Filter tasks by status and priority
- Sort by newest / oldest / priority
- Stats bar (total, to-do, in-progress, done, overdue count)
- Overdue task detection with visual warning
- Double-confirm before deleting
- Toast notifications for all actions
- Character counters on text fields
- Dark theme with Catppuccin-inspired palette

---

## Project Structure

```
task-tracker/
├── backend/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Error handler
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes + validation
│   ├── server.js        # Entry point
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/  # TaskForm, TaskCard, TaskList, FilterBar, StatsBar
    │   ├── context/     # TaskContext (global state via useReducer)
    │   ├── hooks/       # useTaskForm
    │   └── utils/       # api.js (all fetch calls)
    └── .env.example
```
### Query Params (GET /api/tasks)
- `status` — `todo` | `in-progress` | `done`
- `priority` — `low` | `medium` | `high`
- `sort` — `newest` | `oldest` | `priority`

### Task Schema
```json
{
  "title": "string (required, max 100)",
  "description": "string (optional, max 500)",
  "status": "todo | in-progress | done",
  "priority": "low | medium | high",
  "dueDate": "ISO 8601 date string"
}
```


## Deployment

### Backend → Render
link: https://tasktracker-oadw.onrender.com/api

### Frontend → Vercel
link: https://task-tracker-seven-sepia.vercel.app
---

## Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React 18, Vite, Context API   |
| Backend  | Node.js, Express.js           |
| Database | MongoDB, Mongoose             |
| Styling  | Pure CSS (no UI library)      |
| Toasts   | react-hot-toast               |
| Dates    | date-fns                      |
| Deploy   | Vercel (frontend), Render (backend) |
