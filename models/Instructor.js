const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InstructorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String, // URL to the profile picture
    default: null,
  },
  faculty: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Instructor'],
    default: 'Instructor',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

InstructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Instructor', InstructorSchema);
