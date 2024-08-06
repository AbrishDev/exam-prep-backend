const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST route to create a new question
router.post('/', async (req, res) => {
  try {
    const { questionText, isMultipleChoice, options, category, subCategory } = req.body;

    // Validate input
    if (!questionText || !category || !subCategory) {
      return res.status(400).json({ message: 'Question text, category, and sub-category are required.' });
    }

    // If multiple choice, ensure options are provided
    if (isMultipleChoice && (!options || options.length === 0)) {
      return res.status(400).json({ message: 'Options are required for multiple choice questions.' });
    }

    // Create a new question
    const newQuestion = new Question({
      questionText,
      isMultipleChoice,
      options: isMultipleChoice ? options : [], // Include options only if multiple choice
      category,
      subCategory,
    });

    // Save the question to the database
    await newQuestion.save();

    res.status(201).json({ message: 'Question added successfully!', question: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
