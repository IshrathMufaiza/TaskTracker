import React from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, loading } = useTasks();

  if (loading) {
    return (
      <div className="task-list__empty">
        <div className="spinner" />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <p className="empty-icon">📋</p>
        <p>No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
