const User = require('../models/User');
const path = require('path');
const fs = require('fs').promises;

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old resume if exists
    if (user.resume && user.resume.path) {
      try {
        await fs.unlink(user.resume.path);
      } catch (error) {
        console.log('Error deleting old resume:', error.message);
      }
    }

    // Update user with new resume info
    user.resume = {
      filename: req.file.filename,
      path: req.file.path,
      uploadDate: Date.now()
    };

    await user.save();

    res.json({
      message: 'Resume uploaded successfully',
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get resume info
// @route   GET /api/resume
// @access  Private
const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(user.resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Delete file from filesystem
    try {
      await fs.unlink(user.resume.path);
    } catch (error) {
      console.log('Error deleting resume file:', error.message);
    }

    // Remove resume from user document
    user.resume = undefined;
    await user.save();

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadResume,
  getResume,
  deleteResume
};
