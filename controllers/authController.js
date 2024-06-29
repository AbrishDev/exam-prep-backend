const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const SuperAdmin = require('../models/SuperAdmin');
const dotenv = require('dotenv');

dotenv.config();

// Login super admin
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let superAdmin = await SuperAdmin.findOne({ username });

    if (!superAdmin) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: superAdmin.id,
        role: superAdmin.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
