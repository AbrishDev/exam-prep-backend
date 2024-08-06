const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  isMultipleChoice: { type: Boolean, required: true },
  options: [OptionSchema], // Array of options
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
