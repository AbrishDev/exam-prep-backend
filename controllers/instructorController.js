const Instructor = require('../models/Instructor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// Create a new instructor
exports.createInstructor = async (req, res) => {
  const { fullName, faculty, username, password } = req.body;

  try {
    let instructor = await Instructor.findOne({ username });
    if (instructor) {
      return res.status(400).json({ msg: 'Instructor already exists' });
    }

    instructor = new Instructor({
      fullName,
      faculty,
      username,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    instructor.password = await bcrypt.hash(password, salt);

    await instructor.save();
    res.status(201).json({ msg: 'Instructor created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login Instructor
exports.loginInstructor = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find instructor by username
    let instructor = await Instructor.findOne({ username });

    if (!instructor) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, instructor.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate JWT Token
    const payload = {
      user: {
        id: instructor.id,
        role: instructor.role, // Make sure role is included
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send token back to client
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get instructor profile
exports.getInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id).select('-password');
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update instructor profile including password
exports.updateProfile = async (req, res) => {
  const { fullName, faculty, password } = req.body;
  const instructorId = req.user.id; // Assuming authenticated user's ID is in req.user.id

  try {
    let instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ msg: 'Instructor not found' });
    }

    // Update fields
    instructor.fullName = fullName;
    instructor.faculty = faculty;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      instructor.password = await bcrypt.hash(password, salt);
    }

    // Save updated instructor
    await instructor.save();

    res.json({ msg: 'Profile updated successfully', instructor });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
