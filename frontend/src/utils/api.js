// Centralising API calls here so components don't care about URLs or headers
// If the base URL ever changes (like after deploying), we change it in one place

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    // Pull out the first validation error if it exists, otherwise use message
    const message =
      data.errors?.[0]?.msg || data.message || "Something went wrong";
    throw new Error(message);
  }
  return data;
};

export const taskAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/tasks${query ? `?${query}` : ""}`)
      .then(handleResponse);
  },

  getById: (id) =>
    fetch(`${BASE_URL}/tasks/${id}`).then(handleResponse),

  create: (taskData) =>
    fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    }).then(handleResponse),

  update: (id, taskData) =>
    fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" }).then(handleResponse),
};
