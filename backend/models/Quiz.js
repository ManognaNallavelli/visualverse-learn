const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  topicId: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  classLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
