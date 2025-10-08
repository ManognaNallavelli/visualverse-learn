const express = require('express');
const router = express.Router();
const { getAllModels, getModelByTopic, getModelsBySubject } = require('../controllers/modelController');
const { auth } = require('../middleware/auth');

router.get('/', auth, getAllModels);
router.get('/topic/:topicId', auth, getModelByTopic);
router.get('/subject/:subject', auth, getModelsBySubject);

module.exports = router;
