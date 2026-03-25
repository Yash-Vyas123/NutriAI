const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, uploadProfilePic } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update', protect, updateProfile);
router.post('/upload', protect, upload.single('profilePic'), uploadProfilePic);

module.exports = router;
