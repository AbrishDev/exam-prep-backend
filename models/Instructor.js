// src/models/Instructor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
  fullName: { type: String, required: true },
  faculty: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Instructor' }, // Default role
});

module.exports = mongoose.model('Instructor', InstructorSchema);
