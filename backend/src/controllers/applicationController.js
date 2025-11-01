const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private
const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has uploaded resume
    const user = await User.findById(req.user._id);
    if (!user.resume) {
      return res.status(400).json({ 
        message: 'Please upload your resume before applying for jobs' 
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      user: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      user: req.user._id,
      coverLetter
    });

    const populatedApplication = await Application.findById(application._id)
      .populate('job')
      .populate('user', 'name email');

    res.status(201).json(populatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications
// @access  Private
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('job')
      .sort({ appliedAt: -1 });

    res.json({
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('user', 'name email resume');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application or posted the job
    const job = await Job.findById(application.job._id);
    if (
      application.user._id.toString() !== req.user._id.toString() &&
      job.postedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const job = await Job.findById(application.job._id);

    // Only job poster can update application status
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    application.status = req.body.status || application.status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only application owner can delete
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await application.deleteOne();

    res.json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for a job (for job poster)
// @route   GET /api/jobs/:jobId/applications
// @access  Private
const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Only job poster can view applications
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('user', 'name email resume skills experience')
      .sort({ appliedAt: -1 });

    res.json({
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
  getJobApplications
};
