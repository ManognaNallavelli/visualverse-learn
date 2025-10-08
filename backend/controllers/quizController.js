const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const User = require('../models/User');

// Get quiz by topic
exports.getQuizByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    
    const quiz = await Quiz.findOne({ topicId });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found for this topic' });
    }

    // Don't send correct answers to frontend
    const quizData = {
      _id: quiz._id,
      topicId: quiz.topicId,
      topic: quiz.topic,
      subject: quiz.subject,
      classLevel: quiz.classLevel,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    };

    res.json(quizData);
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Submit quiz answers
exports.submitQuiz = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { answers } = req.body;
    const userId = req.userId;

    const quiz = await Quiz.findOne({ topicId });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    const results = quiz.questions.map((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      return {
        question: question.question,
        userAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect
      };
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const completed = score >= 60; // 60% passing score

    // Update or create progress
    const progress = await Progress.findOneAndUpdate(
      { studentId: userId, topicId },
      {
        topic: quiz.topic,
        subject: quiz.subject,
        completed,
        score,
        lastAttemptDate: new Date(),
        updatedAt: new Date(),
        $inc: { attempts: 1 }
      },
      { upsert: true, new: true }
    );

    // Update user points and badges
    const pointsEarned = Math.round(score / 10);
    const user = await User.findById(userId);
    user.points += pointsEarned;
    
    if (completed && progress.attempts === 1) {
      user.badges += 1;
    }
    
    await user.save();

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      results,
      pointsEarned,
      completed,
      totalPoints: user.points,
      totalBadges: user.badges
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

// Get all quizzes (for teachers)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('-questions.correctAnswer');
    res.json(quizzes);
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};
