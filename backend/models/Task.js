const mongoose = require("mongoose");

// Keeping the schema simple but complete enough to support
// filtering, sorting, and priority-based views on the frontend
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Title can't exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can't exceed 500 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt for free
  }
);

module.exports = mongoose.model("Task", taskSchema);
