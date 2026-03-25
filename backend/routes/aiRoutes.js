const express = require('express');
const router = express.Router();
const { getDailyPlan, getWeeklyPlan, getGroceryList, chatbot } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.get('/daily-plan', protect, getDailyPlan);
router.get('/weekly-plan', protect, getWeeklyPlan);
router.get('/grocery-list', protect, getGroceryList);
router.post('/chat', protect, chatbot);

module.exports = router;
