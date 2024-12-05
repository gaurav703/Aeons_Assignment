const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

// User signup
router.post("/signup", signup);

// User login
router.post("/login", login);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

module.exports = router;
