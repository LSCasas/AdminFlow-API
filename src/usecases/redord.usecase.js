const Record = require("../models/Record");
const User = require("../models/User");
const Consumable = require("../models/Consumable");
const Area = require("../models/Area");
const createUser = require("./user.usecase");
const createConsumable = require("./consumable.usecase");
const createArea = require("./area.usecase");
const createError = require("http-errors");

// Crear Registro
const createRecord = async (
  userName,
  consumableName,
  consumableStock,
  areaName,
  quantity,
  date,
  signature
) => {
  try {
    let user = await User.findOne({ name: userName });
    if (!user) {
      user = await createUser(userName);
    }

    let consumable = await Consumable.findOne({ name: consumableName });
    if (!consumable) {
      consumable = await createConsumable(consumableName, consumableStock);
    }

    let area = await Area.findOne({ name: areaName });
    if (!area) {
      area = await createArea(areaName);
    }

    const newRecord = new Record({
      user_id: user._id,
      area_id: area._id,
      consumable_id: consumable._id,
      quantity,
      date,
      signature,
    });

    await newRecord.save();
    return newRecord;
  } catch (error) {
    throw createError(500, "Error creating record: " + error.message);
  }
};

// Obtener todos los registros
const getRecords = async (filter = {}) => {
  try {
    const records = await Record.find(filter)
      .populate("user_id")
      .populate("area_id")
      .populate("consumable_id");
    return records;
  } catch (error) {
    throw createError(500, "Error fetching records: " + error.message);
  }
};

// Obtener un registro por su ID
const getRecordById = async (id) => {
  try {
    const record = await Record.findById(id)
      .populate("user_id")
      .populate("area_id")
      .populate("consumable_id");
    return record;
  } catch (error) {
    throw createError(404, "Record not found: " + error.message);
  }
};

// Actualizar un registro por su ID
const updateRecord = async (id, updatedData) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
      .populate("user_id")
      .populate("area_id")
      .populate("consumable_id");
    return updatedRecord;
  } catch (error) {
    throw createError(500, "Error updating record: " + error.message);
  }
};

// Eliminar un registro por su ID
const deleteRecord = async (id) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(id);
    if (!deletedRecord) {
      throw createError(404, "Record not found");
    }
    return deletedRecord;
  } catch (error) {
    throw createError(500, "Error deleting record: " + error.message);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
