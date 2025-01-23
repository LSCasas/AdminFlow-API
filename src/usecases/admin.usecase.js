const Admin = require("../models/admin.model");
const createError = require("http-errors");
const encrypt = require("../lib/encrypt");

// Create an admin
const createAdmin = async (email, password) => {
  try {
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
      throw createError(409, "Email already in use");
    }

    if (!password) {
      throw createError(400, "Password is required");
    }

    // Encrypt password
    try {
      password = await encrypt.encrypt(password);
    } catch (error) {
      console.error("Error encrypting password:", error);
      throw createError(500, "Encryption failed");
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    return newAdmin;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw createError(500, "Error creating admin: " + error.message);
  }
};

// Get all admins
const getAllAdmin = async () => {
  try {
    const admins = await Admin.find();
    return admins;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw createError(500, "Error fetching all admins: " + error.message);
  }
};

// Get an admin by ID
const getAdminById = async (id) => {
  try {
    const admin = await Admin.findById(id);
    if (!admin) throw createError(404, "Admin not found");
    return admin;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid admin ID");
    }
    throw createError(500, "Error fetching admin: " + error.message);
  }
};

// Get an admin by email
const getAdminByEmail = async (email) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) throw createError(404, "Admin not found");
    return admin;
  } catch (error) {
    throw createError(500, "Error fetching admin by email: " + error.message);
  }
};

// Update an admin by ID
const updateAdmin = async (id, { email, password }) => {
  try {
    const admin = await Admin.findById(id);
    if (!admin) throw createError(404, "Admin not found");

    if (password) {
      try {
        password = await encrypt.encrypt(password);
      } catch (error) {
        console.error("Error encrypting password:", error);
        throw createError(500, "Encryption failed");
      }
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { email, password },
      { new: true, runValidators: true }
    );
    return updatedAdmin;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid admin ID");
    }
    throw createError(500, "Error updating admin: " + error.message);
  }
};

// Delete an admin by ID
const deleteAdmin = async (id) => {
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) throw createError(404, "Admin not found");
    return admin;
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw createError(400, "Invalid admin ID");
    }
    throw createError(500, "Error deleting admin: " + error.message);
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getAdminById,
  getAdminByEmail,
  updateAdmin,
  deleteAdmin,
};
