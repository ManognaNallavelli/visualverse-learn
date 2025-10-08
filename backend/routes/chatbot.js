const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatbotController');
const { auth } = require('../middleware/auth');

router.post('/chat', auth, chat);

module.exports = router;
