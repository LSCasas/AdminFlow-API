const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmin,
  getAdminById,
  getAdminByEmail,
  updateAdmin,
  deleteAdmin,
} = require("../usecases/admin.usecase");

// Create a new admin
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newAdmin = await createAdmin(email, password);
    res.status(201).json({
      success: true,
      data: newAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      error: "Error creating admin",
    });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await getAllAdmin();
    res.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching admins",
    });
  }
});

// Get an admin by ID
router.get("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await getAdminById(adminId);
    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get an admin by email
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await getAdminByEmail(email);
    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin by email:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update an admin
router.patch("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const { email, password } = req.body;
    const updatedAdmin = await updateAdmin(adminId, { email, password });
    res.json({
      success: true,
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    await deleteAdmin(adminId);
    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
