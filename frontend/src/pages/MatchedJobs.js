import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService, applicationService } from '../services';
import JobCard from '../components/JobCard';
import './MatchedJobs.css';

const MatchedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadMatchedJobs();
  }, []);

  const loadMatchedJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getMatched();
      setJobs(data.jobs || []);
      
      if (data.message) {
        setMessage({ type: 'info', text: data.message });
      }
    } catch (error) {
      console.error('Error loading matched jobs:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to load matched jobs' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    setMessage({ type: '', text: '' });
    
    try {
      await applicationService.apply({ jobId });
      setMessage({ 
        type: 'success', 
        text: 'Application submitted successfully!' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to apply for job' 
      });
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="container">
      <h1>Jobs Matched to Your Skills</h1>
      <p className="subtitle">
        These jobs match the skills in your profile. Update your profile to see more relevant matches!
      </p>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading matched jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="card no-matches">
          <h3>No matched jobs found</h3>
          <p>
            Add skills to your profile to get personalized job recommendations.
          </p>
          <button 
            onClick={() => navigate('/profile')}
            className="btn btn-primary"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="jobs-list">
          <div className="match-info">
            <p>✨ Found {jobs.length} job{jobs.length !== 1 ? 's' : ''} matching your skills</p>
          </div>
          {jobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onApply={handleApply}
              onView={handleViewJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchedJobs;
