const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createConsumable,
  getAllConsumables,
  getConsumableById,
  updateConsumable,
  deleteConsumable,
} = require("../usecases/consumable.usecase");

// Create a new consumable
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, stock, quantity } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Name is required",
      });
    }

    const consumable = await createConsumable(name, stock, quantity);
    res.status(201).json({
      success: true,
      data: consumable,
    });
  } catch (error) {
    console.error("Error creating/updating consumable:", error);
    res.status(500).json({
      success: false,
      error: "Error creating/updating consumable",
    });
  }
});

// Get all consumables
router.get("/", authMiddleware, async (req, res) => {
  try {
    const consumables = await getAllConsumables();
    res.json({
      success: true,
      data: consumables,
    });
  } catch (error) {
    console.error("Error fetching consumables:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching consumables",
    });
  }
});

// Get a single consumable by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const consumableId = req.params.id;
    const consumable = await getConsumableById(consumableId);
    res.json({
      success: true,
      data: consumable,
    });
  } catch (error) {
    console.error("Error fetching consumable by ID:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update a consumable
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const consumableId = req.params.id;
    const { name, stock, quantity } = req.body;
    const updatedConsumable = await updateConsumable(
      consumableId,
      name,
      stock,
      quantity
    );
    res.json({
      success: true,
      data: updatedConsumable,
    });
  } catch (error) {
    console.error("Error updating consumable:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete a consumable
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const consumableId = req.params.id;
    await deleteConsumable(consumableId);
    res.json({
      success: true,
      message: "Consumable deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting consumable:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
