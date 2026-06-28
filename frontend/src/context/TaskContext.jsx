import React, { createContext, useContext, useReducer, useCallback } from "react";
import { taskAPI } from "../utils/api";
import toast from "react-hot-toast";

const TaskContext = createContext(null);

// Using a reducer instead of scattered useState calls keeps state transitions
// predictable — easier to debug when something breaks
const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false };

    case "ADD_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t._id !== action.payload),
      };

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  loading: false,
  filters: { status: "", priority: "", sort: "newest" },
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async (filters = {}) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      // Remove empty filter values so we don't send ?status=&priority=
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      const data = await taskAPI.getAll(cleanFilters);
      dispatch({ type: "SET_TASKS", payload: data.tasks });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const createTask = async (taskData) => {
    const data = await taskAPI.create(taskData);
    dispatch({ type: "ADD_TASK", payload: data.task });
    toast.success("Task created!");
    return data.task;
  };

  const updateTask = async (id, taskData) => {
    const data = await taskAPI.update(id, taskData);
    dispatch({ type: "UPDATE_TASK", payload: data.task });
    toast.success("Task updated!");
    return data.task;
  };

  const deleteTask = async (id) => {
    await taskAPI.delete(id);
    dispatch({ type: "DELETE_TASK", payload: id });
    toast.success("Task deleted");
  };

  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };

  return (
    <TaskContext.Provider
      value={{ ...state, fetchTasks, createTask, updateTask, deleteTask, setFilters }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook so components don't have to import useContext + TaskContext separately
export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside <TaskProvider>");
  return ctx;
};
