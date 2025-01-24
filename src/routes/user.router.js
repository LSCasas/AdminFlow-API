const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../usecases/user.usecase");

// Create a new user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, signature } = req.body;
    const newUser = await createUser(name, signature);
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      error: "Error creating user",
    });
  }
});

// Get all users
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching users",
    });
  }
});

// Get a user by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update a user by ID
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, signature } = req.body;
    const updatedUser = await updateUserById(userId, name, signature);
    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete a user by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUserById(userId);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
