const Record = require("../models/record.model");
const User = require("../models/user.model");
const Consumable = require("../models/consumable.model");
const Area = require("../models/area.model");
const { createUser } = require("./user.usecase");
const { createConsumable } = require("./consumable.usecase");
const { createArea } = require("./area.usecase");
const createError = require("http-errors");

// Create a new record
const createRecord = async (
  userName,
  consumableName,
  consumableStock,
  areaName,
  consumableQuantity,
  date,
  userSignature
) => {
  try {
    let user = await User.findOne({ name: userName });
    if (!user) {
      user = await createUser(userName, userSignature);
    }

    let consumable = await Consumable.findOne({ name: consumableName });
    if (!consumable) {
      consumable = await createConsumable(
        consumableName,
        consumableStock,
        consumableQuantity
      );
    }

    let area = await Area.findOne({ name: areaName });
    if (!area) {
      area = await createArea(areaName);
    }

    const newRecord = new Record({
      user_id: user._id,
      area_id: area._id,
      consumable_id: consumable._id,
      date,
    });

    await newRecord.save();
    return newRecord;
  } catch (error) {
    throw createError(500, "Error creating record: " + error.message);
  }
};

// Get all records
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

// Get record by id
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

// Update a register by id
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

// Delete a register
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
