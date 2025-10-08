const Progress = require('../models/Progress');
const User = require('../models/User');

// Get student progress
exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    
    const progress = await Progress.find({ studentId: userId })
      .sort({ updatedAt: -1 });
    
    const user = await User.findById(userId);
    
    // Calculate overall statistics
    const totalTopics = progress.length;
    const completedTopics = progress.filter(p => p.completed).length;
    const overallProgress = totalTopics > 0 
      ? Math.round((completedTopics / totalTopics) * 100) 
      : 0;
    
    const averageScore = totalTopics > 0
      ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / totalTopics)
      : 0;

    res.json({
      progress,
      statistics: {
        totalPoints: user.points,
        totalBadges: user.badges,
        streak: user.streak,
        overallProgress,
        totalTopics,
        completedTopics,
        averageScore
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};

// Get progress by subject
exports.getProgressBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const userId = req.userId;
    
    const progress = await Progress.find({ 
      studentId: userId, 
      subject 
    }).sort({ updatedAt: -1 });
    
    res.json(progress);
  } catch (error) {
    console.error('Get subject progress error:', error);
    res.status(500).json({ error: 'Failed to fetch subject progress' });
  }
};

// Update streak
exports.updateStreak = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    // Simple streak logic - can be enhanced
    user.streak += 1;
    await user.save();
    
    res.json({ streak: user.streak });
  } catch (error) {
    console.error('Update streak error:', error);
    res.status(500).json({ error: 'Failed to update streak' });
  }
};
