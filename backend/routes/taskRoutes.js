const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Route to create a task
router.post("/", createTask);

// Route to get all tasks for a user
router.get("/user/:id", getTasks);

// Route to update a task
router.put("/:id", updateTask);

// Route to delete a task
router.delete("/:id", deleteTask);

module.exports = router;
