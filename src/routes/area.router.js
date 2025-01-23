const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
} = require("../usecases/area.usecase");

// Create a new area
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newArea = await createArea(name);
    res.status(201).json({
      success: true,
      data: newArea,
    });
  } catch (error) {
    console.error("Error creating area:", error);
    res.status(500).json({
      success: false,
      error: "Error creating area",
    });
  }
});

// Get all areas
router.get("/", authMiddleware, async (req, res) => {
  try {
    const areas = await getAllAreas();
    res.json({
      success: true,
      data: areas,
    });
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching areas",
    });
  }
});

// Get a single area by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const areaId = req.params.id;
    const area = await getAreaById(areaId);
    res.json({
      success: true,
      data: area,
    });
  } catch (error) {
    console.error("Error fetching area by ID:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update an area
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const areaId = req.params.id;
    const { name } = req.body;
    const updatedArea = await updateArea(areaId, name);
    res.json({
      success: true,
      data: updatedArea,
    });
  } catch (error) {
    console.error("Error updating area:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete an area
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const areaId = req.params.id;
    await deleteArea(areaId);
    res.json({
      success: true,
      message: "Area deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting area:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
