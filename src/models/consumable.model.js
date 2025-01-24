const mongoose = require("mongoose");

const consumableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Consumable = mongoose.model("Consumable", consumableSchema);

module.exports = Consumable;
