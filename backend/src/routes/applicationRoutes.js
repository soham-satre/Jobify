const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  applyForJob,
  getMyApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
  getJobApplications
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const applicationValidation = [
  body('jobId').notEmpty().withMessage('Job ID is required')
];

// Routes
router.post('/', protect, applicationValidation, validate, applyForJob);
router.get('/', protect, getMyApplications);
router.get('/:id', protect, getApplication);
router.put('/:id', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
