const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  topicId: {
    type: String,
    required: true,
    unique: true
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
  modelUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keyPoints: [{
    type: String
  }],
  funFact: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Model', modelSchema);
