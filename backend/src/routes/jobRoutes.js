const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getMatchedJobs
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
];

// Routes
router.get('/', getJobs);
router.get('/matched', protect, getMatchedJobs);
router.get('/:id', getJob);
router.post('/', protect, jobValidation, validate, createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
