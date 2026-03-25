const express = require('express');
const router = express.Router();
const { searchFoods, getAllFoods } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchFoods);
router.get('/all', protect, getAllFoods);

module.exports = router;
