const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"], // match the options from the frontend dropdown
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    enum: ["SE", "CS", "IS", "IT"], // match the options from the frontend dropdown
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "superadmin"],
    default: "student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
