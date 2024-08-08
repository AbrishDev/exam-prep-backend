const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const upload = require("../middleware/upload"); // Multer middleware for image upload

// Route for creating a new question
router.post("/", upload.single("image"), questionController.createQuestion);

// Route for getting all questions
router.get("/", questionController.getAllQuestions);

// Route for getting a question by ID
router.get("/:id", questionController.getQuestionById);

// Route for updating a question
router.put("/:id", questionController.updateQuestion);

// Route for deleting a question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
