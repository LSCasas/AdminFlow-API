const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../usecases/redord.usecase");

// Create a record
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      userName,
      consumableName,
      consumableStock,
      areaName,
      consumableQuantity,
      date,
      userSignature,
    } = req.body;

    // Asegúrate de pasar consumableQuantity a tempVal
    const newRecord = await createRecord(
      userName,
      consumableName,
      consumableStock,
      areaName,
      consumableQuantity,
      date,
      consumableQuantity, // Aquí se pasa consumableQuantity como tempVal
      userSignature
    );

    res.status(201).json({
      success: true,
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({
      success: false,
      error: "Error creating record",
    });
  }
});

// Get all records
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filter = req.query;
    const records = await getRecords(filter);
    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching records",
    });
  }
});

// Get a record by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.id;
    const record = await getRecordById(recordId);
    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Error fetching record by ID:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update a record
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.id;
    const updatedData = req.body;
    const updatedRecord = await updateRecord(recordId, updatedData);
    res.json({
      success: true,
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete a record by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const recordId = req.params.id;
    await deleteRecord(recordId);
    res.json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
