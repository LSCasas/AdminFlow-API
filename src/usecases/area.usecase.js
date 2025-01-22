const Area = require("../models/area.model");
const createError = require("http-errors");

// Create an Area
const createArea = async (name) => {
  try {
    const newArea = new Area({ name });
    await newArea.save();
    return newArea;
  } catch (error) {
    throw createError(500, "Error creating area: " + error.message);
  }
};

// Read all Areas
const getAllAreas = async () => {
  try {
    const areas = await Area.find();
    return areas;
  } catch (error) {
    throw createError(500, "Error retrieving areas: " + error.message);
  }
};

// Read a single Area by ID
const getAreaById = async (id) => {
  try {
    const area = await Area.findById(id);
    if (!area) {
      throw createError(404, "Area not found");
    }
    return area;
  } catch (error) {
    if (error.name === "CastError") {
      throw createError(400, "Invalid area ID");
    }
    throw createError(500, "Error retrieving area: " + error.message);
  }
};

// Update an Area by ID
const updateArea = async (id, name) => {
  try {
    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedArea) {
      throw createError(404, "Area not found");
    }
    return updatedArea;
  } catch (error) {
    if (error.name === "CastError") {
      throw createError(400, "Invalid area ID");
    }
    throw createError(500, "Error updating area: " + error.message);
  }
};

// Delete an Area by ID
const deleteArea = async (id) => {
  try {
    const deletedArea = await Area.findByIdAndDelete(id);
    if (!deletedArea) {
      throw createError(404, "Area not found");
    }
    return deletedArea;
  } catch (error) {
    if (error.name === "CastError") {
      throw createError(400, "Invalid area ID");
    }
    throw createError(500, "Error deleting area: " + error.message);
  }
};

module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
};
