const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"], // match the options from the frontend dropdown
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    enum: ["SE", "CS", "IS", "IT"], // match the options from the frontend dropdown
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "superadmin"],
    default: "student",
  },
  solvedQuestions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      solvedAt: {
        type: Date,
        default: Date.now,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
      userAnswer: {
        type: Number,
        required: true,
        validate: [answerRange, 'Answer must be an index between 0 and 3.'],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function answerRange(val) {
  return val >= 0 && val <= 3;
}

module.exports = mongoose.model("User", UserSchema);
