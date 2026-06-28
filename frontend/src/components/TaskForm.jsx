import React from "react";
import { useTaskForm } from "../hooks/useTaskForm";
import { useTasks } from "../context/TaskContext";

// Used for both creating and editing — the `task` prop makes it an edit form
const TaskForm = ({ task = null, onClose }) => {
  const { createTask, updateTask } = useTasks();
  const { form, errors, handleChange, validate, reset } = useTaskForm(
    task
      ? {
          ...task,
          dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        }
      : {}
  );

  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (task) {
        await updateTask(task._id, form);
      } else {
        await createTask(form);
        reset();
      }
      onClose?.();
    } catch (err) {
      // toast already shown in context, just stop loading
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" noValidate>
      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? "input-error" : ""}
          maxLength={100}
        />
        {errors.title && <span className="error-msg">{errors.title}</span>}
        <span className="char-count">{form.title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Any extra details... (optional)"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className={errors.description ? "input-error" : ""}
          maxLength={500}
        />
        {errors.description && (
          <span className="error-msg">{errors.description}</span>
        )}
        <span className="char-count">{form.description.length}/500</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        {onClose && (
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : task ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
