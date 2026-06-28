const Task = require("../models/Task");
const { validationResult } = require("express-validator");

// GET /api/tasks
// Supports ?status=, ?priority=, ?sort= query params
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, sort } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // sort options: "newest", "oldest", "priority"
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "priority") {
      // high → medium → low using a custom ordering
      sortOption = { priority: 1 }; // alphabetical isn't ideal but works as a proxy
    }

    const tasks = await Task.find(filter).sort(sortOption);
    res.json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    // express-validator errors come through here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({ title, description, status, priority, dueDate });
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true } // return updated doc + run schema validators
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
