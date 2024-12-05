const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, userid } = req.body;

  try {
    const task = await Task.create({
      user: userid,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for a logged-in user
const getTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.find({ user: id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (task) {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found or not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (task && task.user.toString() === req.user.id) {
      await task.remove();
      res.json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found or not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
