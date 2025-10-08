const Model = require('../models/Model');

// Get all 3D models
exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find().sort({ subject: 1, classLevel: 1 });
    res.json(models);
  } catch (error) {
    console.error('Get models error:', error);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
};

// Get model by topic
exports.getModelByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    
    const model = await Model.findOne({ topicId });
    if (!model) {
      return res.status(404).json({ error: 'Model not found for this topic' });
    }
    
    res.json(model);
  } catch (error) {
    console.error('Get model error:', error);
    res.status(500).json({ error: 'Failed to fetch model' });
  }
};

// Get models by subject
exports.getModelsBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    
    const models = await Model.find({ subject }).sort({ classLevel: 1 });
    res.json(models);
  } catch (error) {
    console.error('Get subject models error:', error);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
};
