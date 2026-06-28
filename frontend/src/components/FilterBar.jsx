import React from "react";
import { useTasks } from "../context/TaskContext";

// Bonus feature: lets users slice the task list without touching the DB
// The filter state lives in context so it persists across re-renders
const FilterBar = () => {
  const { filters, setFilters, fetchTasks, tasks } = useTasks();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    fetchTasks(updated); // refetch from backend with new params
  };

  const clearFilters = () => {
    const reset = { status: "", priority: "", sort: "newest" };
    setFilters(reset);
    fetchTasks(reset);
  };

  const hasActiveFilters = filters.status || filters.priority;

  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select name="priority" value={filters.priority} onChange={handleChange}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">By Priority</option>
        </select>

        {hasActiveFilters && (
          <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <span className="filter-bar__count">
        {tasks.length} task{tasks.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
};

export default FilterBar;
