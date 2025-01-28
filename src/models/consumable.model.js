const mongoose = require("mongoose");

const consumableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Guarda siempre en minúsculas
    unique: true, // Asegura que no haya duplicados, insensible a mayúsculas
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
    required: false,
  },
});

const Consumable = mongoose.model("Consumable", consumableSchema);

module.exports = Consumable;
