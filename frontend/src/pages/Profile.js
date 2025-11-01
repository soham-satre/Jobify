import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { resumeService, authService } from '../services';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: ''
  });
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await authService.getProfile();
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        skills: profile.skills?.join(', ') || '',
        experience: profile.experience || ''
      });
      
      if (profile.resume) {
        setResume(profile.resume);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s);

      const updatedUser = await authService.updateProfile({
        name: formData.name,
        email: formData.email,
        skills: skillsArray,
        experience: formData.experience
      });

      updateUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a file' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await resumeService.upload(selectedFile);
      setResume(result.resume);
      setSelectedFile(null);
      setMessage({ type: 'success', text: 'Resume uploaded successfully!' });
      
      // Reset file input
      document.getElementById('resume-file').value = '';
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to upload resume' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResumeDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await resumeService.delete();
      setResume(null);
      setMessage({ type: 'success', text: 'Resume deleted successfully!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to delete resume' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>My Profile</h1>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-grid">
        <div className="card">
          <h2>Personal Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                className="form-control"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <div className="form-group">
              <label>Experience</label>
              <textarea
                name="experience"
                className="form-control"
                value={formData.experience}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your work experience..."
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Resume</h2>
          
          {resume ? (
            <div className="resume-info">
              <p>✅ Resume uploaded</p>
              <p className="resume-filename">{resume.filename}</p>
              <p className="resume-date">
                Uploaded: {new Date(resume.uploadDate).toLocaleDateString()}
              </p>
              <button 
                onClick={handleResumeDelete} 
                className="btn btn-danger"
                disabled={loading}
              >
                Delete Resume
              </button>
            </div>
          ) : (
            <p className="no-resume">No resume uploaded yet</p>
          )}

          <form onSubmit={handleResumeUpload} className="resume-upload-form">
            <div className="form-group">
              <label>Upload Resume (PDF, DOC, DOCX)</label>
              <input
                type="file"
                id="resume-file"
                className="form-control"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={loading || !selectedFile}
            >
              {loading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
