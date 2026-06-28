# ✅ Task Tracker — MERN Stack

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

---

## Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd task-tracker
```

### 2. Set up environment variables

**Backend** — create `backend/.env` from the example:
```bash
cp backend/.env.example backend/.env
```
Fill in your MongoDB Atlas connection string and client URL.

**Frontend** — create `frontend/.env` from the example:
```bash
cp frontend/.env.example frontend/.env
```
Set `VITE_API_URL` to your backend URL.

### 3. Install dependencies
```bash
# From root
npm install          # installs concurrently
cd backend && npm install
cd ../frontend && npm install
```

### 4. Run both servers
```bash
# From root
npm run dev
```
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

## REST API Reference

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/tasks        | Get all tasks (+ filters)|
| GET    | /api/tasks/:id    | Get task by ID           |
| POST   | /api/tasks        | Create a task            |
| PUT    | /api/tasks/:id    | Update a task            |
| DELETE | /api/tasks/:id    | Delete a task            |

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

---

## Deployment

### Backend → Render
1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo, set root directory to `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGO_URI`, `PORT`, `CLIENT_URL`

### Frontend → Vercel
1. Import your repo on [vercel.com](https://vercel.com)
2. Set root directory to `frontend/`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

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
