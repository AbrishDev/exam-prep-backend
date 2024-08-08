const Question = require("../models/Question");

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    // Extract fields from request body
    const {
      question,
      department,
      course,
      subCategory,
      isMultipleChoice,
      options,
    } = req.body;

    // Log received data
    console.log("Received data:", req.body);

    // Validate required fields
    if (!question || !department || !course || !subCategory) {
      return res.status(400).json({
        message: "All fields are required. Please fill them in.",
      });
    }

    // Parse options if they are a JSON string
    let parsedOptions;
    try {
      parsedOptions = JSON.parse(options);
    } catch (error) {
      return res.status(400).json({
        message: "Options must be a valid JSON string.",
        error: error.message,
      });
    }

    // Validate options length for multiple choice
    if (isMultipleChoice === "true" && parsedOptions.length < 2) {
      return res.status(400).json({
        message: "Multiple choice questions must have at least two options.",
      });
    }

    // Ensure at least one option is correct
    const hasCorrectOption = parsedOptions.some((opt) => opt.isCorrect);
    if (!hasCorrectOption) {
      return res.status(400).json({
        message: "At least one correct option must be selected.",
      });
    }

    // Handle image if uploaded
    let image = null;
    if (req.file) {
      image = req.file.path; // Use the path of the uploaded file
    }

    // Create a new question instance
    const questionData = new Question({
      questionText: question, // Use 'question' instead of 'questionText'
      department,
      course,
      subCategory,
      isMultipleChoice: isMultipleChoice === "true", // Convert to boolean
      options: parsedOptions,
      image,
    });

    // Save question to MongoDB
    await questionData.save();

    // Respond with success message
    res.status(201).json({ message: "Question created successfully!" });
  } catch (error) {
    // Log the error
    console.error("Error creating question:", error);

    // Respond with error message
    res.status(500).json({
      message: "An error occurred while creating the question.",
      error: error.message,
    });
  }
};

// Get all questions filtered by department
exports.getAllQuestions = async (req, res) => {
  try {
    const department = req.query.department; // Get department from query parameter

    // If department is provided, filter by it
    const query = department ? { department } : {};

    // Find questions based on the query
    const questions = await Question.find(query);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving questions.",
      error: error.message,
    });
  }
};


// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the question.",
      error: error.message,
    });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.status(200).json({
      message: "Question updated successfully!",
      updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the question.",
      error: error.message,
    });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the question.",
      error: error.message,
    });
  }
};
