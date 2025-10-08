const express = require('express');
const router = express.Router();
const { getProgress, getProgressBySubject, updateStreak } = require('../controllers/progressController');
const { auth, checkRole } = require('../middleware/auth');

router.get('/', auth, checkRole(['student']), getProgress);
router.get('/subject/:subject', auth, checkRole(['student']), getProgressBySubject);
router.post('/streak', auth, checkRole(['student']), updateStreak);

module.exports = router;
