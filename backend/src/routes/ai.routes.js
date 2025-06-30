const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.post('/get-ai-review', aiController.getAiReview);

module.exports = router;