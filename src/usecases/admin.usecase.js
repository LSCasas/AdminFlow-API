const Admin = require("../models/admin.model");
const createError = require("http-errors");
const encrypt = require("../lib/encrypt");

async function createAdmin(data) {
  try {
    const adminFound = await Admin.findOne({ email: data.email });
    if (adminFound) {
      throw createError(409, "Email already in use");
    }

    if (!data.password) {
      throw createError(400, "Password is required");
    }

    try {
      data.password = await encrypt.encrypt(data.password);
    } catch (error) {
      console.error("Error encrypting password:", error);
      throw createError(500, "Encryption failed");
    }

    const newAdmin = await Admin.create(data);
    return newAdmin;
  } catch (error) {
    console.error("Error creating admin:", error); // Registro del error para depuración.
    throw createError(500, error.message || "Server error");
  }
}

async function getAllAdmin() {
  try {
    const admins = await Admin.find();
    return admins;
  } catch (error) {
    console.error("Error fetching all admins:", error); // Registro del error para depuración.
    throw createError(500, "Error fetching all admins");
  }
}

async function getAdminById(id) {
  return Admin.findById(id);
}

async function updateAdmin(id, data) {
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw createError(404, "Admin not found");
    }

    if (data.password) {
      try {
        data.password = await encrypt.encrypt(data.password);
      } catch (error) {
        console.error("Error encrypting password:", error);
        throw createError(500, "Encryption failed");
      }
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, data, { new: true });
    return updatedAdmin;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw createError(500, error.message || "Server error");
  }
}

async function deleteAdmin(id) {
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw createError(404, "Admin not found");
    }

    await Admin.findByIdAndDelete(id);
    return { message: "Admin deleted successfully" };
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw createError(500, error.message || "Server error");
  }
}

module.exports = {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
