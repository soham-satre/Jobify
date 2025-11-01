const express = require('express');
const router = express.Router();
const { uploadResume, getResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes
router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResume);
router.delete('/', protect, deleteResume);

module.exports = router;
