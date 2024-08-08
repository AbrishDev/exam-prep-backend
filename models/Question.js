const mongoose = require("mongoose");

// Define option schema for multiple choice questions
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

// Define question schema
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required."],
  },
  department: {
    type: String,
    required: [true, "Department is required."],
  },
  course: {
    type: String,
    required: [true, "Course is required."],
  },
  subCategory: {
    type: String,
    required: [true, "Sub-category is required."],
  },
  isMultipleChoice: {
    type: Boolean,
    required: [true, "Question type (multiple choice) is required."],
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (value) {
        // Validate at least two options for multiple choice
        return this.isMultipleChoice ? value.length >= 2 : true;
      },
      message: "Multiple choice questions must have at least two options.",
    },
  },
  image: {
    type: String,
    default: null, // Optional image field
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
