const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// @route   POST api/auth/login
// @desc    Login super admin
// @access  Public
router.post(
  '/login',
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

module.exports = router;
