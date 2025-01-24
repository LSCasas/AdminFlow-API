const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  area_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
  consumable_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consumable",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
