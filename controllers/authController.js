// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SuperAdmin = require('../models/SuperAdmin');
const Instructor = require('../models/Instructor');

// Login function for both superadmin and instructor
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user is a superadmin
    let user = await SuperAdmin.findOne({ username });

    if (user) {
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Generate JWT token with role
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            role: 'superadmin', // Adding role
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      return res.json({ token });
    }

    // Check if the user is an instructor
    user = await Instructor.findOne({ username });

    if (user) {
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Generate JWT token with role
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            role: 'instructor', // Adding role
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({ token });
    }

    // User not found
    return res.status(400).json({ msg: 'Invalid Credentials' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
