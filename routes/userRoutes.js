const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('fullname', 'Full name is required').not().isEmpty(),
    check('gender', 'Gender is required').isIn(['male', 'female', 'other']),
    check('idNumber', 'ID number is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('confirmPassword', 'Please confirm your password').exists(),
  ],
  userController.register
);

// @route   POST api/users/login
// @desc    Login user & get token
// @access  Public
router.post(
  '/login',
  [
    check('idNumber', 'ID number is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  userController.login
);

// @route   GET api/users/me
// @desc    Get logged in user
// @access  Private
router.get('/me', auth, userController.getUser);

module.exports = router;
