const Question = require('../models/Question');
const Category = require('../models/Category');

// Create a new question
exports.createQuestion = async (req, res) => {
  const { title, options, answer, category, difficulty } = req.body;

  // Validate the options
  if (options.length !== 4) {
    return res.status(400).json({ message: 'Exactly four options are required.' });
  }

  // Validate the answer
  if (answer < 0 || answer > 3) {
    return res.status(400).json({ message: 'Answer must be an index between 0 and 3.' });
  }

  try {
    // Check if the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    const newQuestion = new Question({
      title,
      options,
      answer,
      category,
      difficulty,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Retrieve all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('category', 'name');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Retrieve a question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id).populate('category', 'name');
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, options, answer, category, difficulty } = req.body;

  // Validate the options
  if (options && options.length !== 4) {
    return res.status(400).json({ message: 'Exactly four options are required.' });
  }

  // Validate the answer
  if (answer !== undefined && (answer < 0 || answer > 3)) {
    return res.status(400).json({ message: 'Answer must be an index between 0 and 3.' });
  }

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found.' });
      }
    }

    question.title = title || question.title;
    question.options = options || question.options;
    question.answer = answer !== undefined ? answer : question.answer;
    question.category = category || question.category;
    question.difficulty = difficulty || question.difficulty;

    await question.save();
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json({ message: 'Question deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
