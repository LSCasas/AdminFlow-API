const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  signature: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
