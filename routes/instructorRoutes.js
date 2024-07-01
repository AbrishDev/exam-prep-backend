const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const instructorController = require("../controllers/instructorController");

// @route   POST api/instructors
// @desc    Create a new instructor
// @access  Private (SuperAdmin)
router.post(
  "/",
  [
    authMiddleware,
    roleMiddleware("SuperAdmin"),
    [
      check("fullName", "Full name is required").not().isEmpty(),
      check("faculty", "Faculty is required").not().isEmpty(),
      check("username", "Username is required").not().isEmpty(),
      check("password", "Password is required").isLength({ min: 6 }),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    instructorController.createInstructor(req, res);
  }
);

router.put(
  "/profile",
  [
    authMiddleware, // Ensure user is authenticated
    [
      check("fullName", "Full name is required").not().isEmpty(),
      check("faculty", "Faculty is required").not().isEmpty(),
      check("password", "Password must be at least 6 characters")
        .optional()
        .isLength({ min: 6 }),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    instructorController.updateProfile(req, res);
  }
);

// @route   POST api/instructors/login
// @desc    Login as an instructor
// @access  Public
router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    instructorController.loginInstructor(req, res);
  }
);

// @route   GET api/instructors/me
// @desc    Get instructor profile
// @access  Private (Instructor)
router.get("/me", authMiddleware, roleMiddleware("Instructor"), (req, res) => {
  instructorController.getInstructorProfile(req, res);
});

module.exports = router;
