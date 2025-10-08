const express = require('express');
const router = express.Router();
const { getQuizByTopic, submitQuiz, getAllQuizzes } = require('../controllers/quizController');
const { auth, checkRole } = require('../middleware/auth');

router.get('/topic/:topicId', auth, getQuizByTopic);
router.post('/topic/:topicId/submit', auth, checkRole(['student']), submitQuiz);
router.get('/all', auth, checkRole(['teacher']), getAllQuizzes);

module.exports = router;
