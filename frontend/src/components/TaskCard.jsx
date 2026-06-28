import React, { useState } from "react";
import { format } from "date-fns";
import { useTasks } from "../context/TaskContext";
import TaskForm from "./TaskForm";

const PRIORITY_LABELS = { low: "Low", medium: "Medium", high: "High" };
const STATUS_LABELS = { todo: "To Do", "in-progress": "In Progress", done: "Done" };

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    try {
      await deleteTask(task._id);
    } catch (_) {
      // toast already shown in context
    }
  };

  if (editing) {
    return (
      <div className="task-card task-card--editing">
        <TaskForm task={task} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className={`task-card priority-${task.priority} ${task.status === "done" ? "task-done" : ""}`}>
      <div className="task-card__header">
        <span className={`badge badge--priority-${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className={`badge badge--status-${task.status}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>

      <h3 className="task-card__title">{task.title}</h3>

      {task.description && (
        <p className="task-card__desc">{task.description}</p>
      )}

      {task.dueDate && (
        <p className={`task-card__due ${isOverdue ? "overdue" : ""}`}>
          📅 {isOverdue ? "Overdue · " : ""}
          {format(new Date(task.dueDate), "dd MMM yyyy")}
        </p>
      )}

      <div className="task-card__footer">
        <span className="task-card__created">
          Added {format(new Date(task.createdAt), "dd MMM")}
        </span>
        <div className="task-card__actions">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setEditing(true)}
            aria-label="Edit task"
          >
            ✏️ Edit
          </button>
          <button
            className={`btn btn-sm ${confirming ? "btn-danger" : "btn-ghost"}`}
            onClick={handleDelete}
            onBlur={() => setConfirming(false)} // reset if user clicks away
            aria-label="Delete task"
          >
            {confirming ? "Sure?" : "🗑️ Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
