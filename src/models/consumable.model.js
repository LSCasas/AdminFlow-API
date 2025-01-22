const mongoose = require("mongoose");

const consumableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Consumable = mongoose.model("Consumable", consumableSchema);

module.exports = Consumable;
