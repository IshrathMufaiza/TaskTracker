const express = require("express");
const { body } = require("express-validator");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Reusable validation rules so we're not copy-pasting them on create + update
const taskValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title can't exceed 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 500 }).withMessage("Description can't exceed 500 characters"),

  body("status")
    .optional()
    .isIn(["todo", "in-progress", "done"]).withMessage("Invalid status value"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"]).withMessage("Invalid priority value"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601().withMessage("Due date must be a valid date"),
];

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", taskValidation, createTask);
router.put("/:id", taskValidation, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
