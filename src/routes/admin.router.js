const express = require("express");
const createError = require("http-errors");
const adminUseCase = require("../usecases/admin.usecase");

const router = express.Router();

// Get all admin
router.get("/", async (req, res) => {
  try {
    const admins = await adminUseCase.getAllAdmin();
    res.json({
      success: true,
      data: { admins },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get admin by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminUseCase.getAdminById(id);
    if (!admin) {
      throw createError(404, "Admin not found");
    }
    res.json({
      success: true,
      data: { admin },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create an admin
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await adminUseCase.getAdminByEmail(email);
    if (existingAdmin) {
      throw createError(409, "Email already in use");
    }

    const adminCreated = await adminUseCase.createAdmin({
      name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      data: { admin: adminCreated },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update an admin
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedAdmin = await adminUseCase.updateAdmin(id, {
      name,
      email,
      password,
    });
    if (!updatedAdmin) {
      throw createError(404, "Admin not found");
    }
    res.json({
      success: true,
      data: { admin: updatedAdmin },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await adminUseCase.deleteAdmin(id);
    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
