import React from "react";
import { useTasks } from "../context/TaskContext";

// A quick stats strip at the top — gives an at-a-glance overview
const StatsBar = () => {
  const { tasks } = useTasks();

  const counts = tasks.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    { todo: 0, "in-progress": 0, done: 0 }
  );

  const overdue = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "done"
  ).length;

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat__value">{tasks.length}</span>
        <span className="stat__label">Total</span>
      </div>
      <div className="stat">
        <span className="stat__value stat__value--todo">{counts["todo"]}</span>
        <span className="stat__label">To Do</span>
      </div>
      <div className="stat">
        <span className="stat__value stat__value--inprogress">{counts["in-progress"]}</span>
        <span className="stat__label">In Progress</span>
      </div>
      <div className="stat">
        <span className="stat__value stat__value--done">{counts["done"]}</span>
        <span className="stat__label">Done</span>
      </div>
      {overdue > 0 && (
        <div className="stat stat--overdue">
          <span className="stat__value">{overdue}</span>
          <span className="stat__label">Overdue ⚠️</span>
        </div>
      )}
    </div>
  );
};

export default StatsBar;
