import { useState } from "react";

const defaultForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

// Pulling form logic into its own hook keeps the component file clean
// and makes it easy to reset the form after submit or when editing a different task
export const useTaskForm = (initialValues = {}) => {
  const [form, setForm] = useState({ ...defaultForm, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user starts fixing it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (form.title.length > 100) {
      newErrors.title = "Title can't exceed 100 characters";
    }

    if (form.description.length > 500) {
      newErrors.description = "Description can't exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setForm(defaultForm);
    setErrors({});
  };

  const populate = (task) => {
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    setErrors({});
  };

  return { form, errors, handleChange, validate, reset, populate };
};
