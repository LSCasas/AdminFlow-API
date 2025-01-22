const User = require("../models/user.model");
const createError = require("http-errors");

// Create an user
const createUser = async (name) => {
  try {
    const newUser = new User({ name });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw createError(500, "Error creating user: " + error.message);
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw createError(500, "Error fetching users: " + error.message);
  }
};

// Get an user by id
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw createError(404, "User not found");
    return user;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid user ID");
    }
    throw createError(500, "Error fetching user: " + error.message);
  }
};

// Update an user
const updateUserById = async (id, name) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!user) throw createError(404, "User not found");
    return user;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid user ID");
    }
    throw createError(500, "Error updating user: " + error.message);
  }
};

// Delete an user
const deleteUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw createError(404, "User not found");
    return user;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid user ID");
    }
    throw createError(500, "Error deleting user: " + error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
