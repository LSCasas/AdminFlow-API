const Consumable = require("../models/consumable.model");
const createError = require("http-errors");

// Create a consumable
const createConsumable = async (name, stock, quantity) => {
  try {
    // Busca si ya existe un consumible con el mismo nombre
    const existingConsumable = await Consumable.findOne({ name: name });

    if (existingConsumable) {
      // Si existe, actualiza el stock y/o cantidad
      existingConsumable.stock = (existingConsumable.stock ?? 0) + (stock ?? 0);
      existingConsumable.quantity =
        (existingConsumable.quantity ?? 0) + (quantity ?? 0);
      existingConsumable.tempVal = existingConsumable.quantity; // Establece tempVal igual a quantity
      await existingConsumable.save();
      return existingConsumable; // Devuelve el consumible actualizado
    } else {
      // Si no existe, crea un nuevo consumible
      const newConsumable = new Consumable({
        name,
        stock: stock ?? null,
        quantity: quantity ?? null,
        tempVal: quantity ?? null, // Establece tempVal igual a quantity
      });
      await newConsumable.save();
      return newConsumable;
    }
  } catch (error) {
    throw createError(
      500,
      "Error creating/updating consumable: " + error.message
    );
  }
};

// Get all consumables
const getAllConsumables = async () => {
  try {
    const consumables = await Consumable.find();
    return consumables;
  } catch (error) {
    throw createError(500, "Error fetching consumables: " + error.message);
  }
};

// Get a single consumable by ID
const getConsumableById = async (id) => {
  try {
    const consumable = await Consumable.findById(id);

    if (!consumable) {
      throw createError(404, "Consumable not found");
    }

    return consumable;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid ID format");
    }
    throw createError(500, "Error fetching consumable: " + error.message);
  }
};

// Update a consumable
const updateConsumable = async (id, name, stock, quantity) => {
  try {
    const updatedConsumable = await Consumable.findByIdAndUpdate(
      id,
      { name, stock, quantity },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedConsumable;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid ID format");
    }
    throw createError(500, "Error updating consumable: " + error.message);
  }
};

// Delete a consumable
const deleteConsumable = async (id) => {
  try {
    const deletedConsumable = await Consumable.findByIdAndDelete(id);

    if (!deletedConsumable) {
      throw createError(404, "Consumable not found");
    }

    return deletedConsumable;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid ID format");
    }
    throw createError(500, "Error deleting consumable: " + error.message);
  }
};

module.exports = {
  createConsumable,
  getAllConsumables,
  getConsumableById,
  updateConsumable,
  deleteConsumable,
};
