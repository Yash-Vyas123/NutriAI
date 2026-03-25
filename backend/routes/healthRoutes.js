const express = require('express');
const router = express.Router();
const { saveHealthProfile, getHealthProfile } = require('../controllers/healthController');
const { protect } = require('../middleware/authMiddleware');

router.post('/profile', protect, saveHealthProfile);
router.get('/profile', protect, getHealthProfile);

module.exports = router;
