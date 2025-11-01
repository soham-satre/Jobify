import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService, applicationService } from '../services';
import JobCard from '../components/JobCard';
import { useAuth } from '../context/AuthContext';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    skills: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async (searchFilters = {}) => {
    setLoading(true);
    try {
      const data = await jobService.getAll(searchFilters);
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to load jobs' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== '')
    );
    loadJobs(searchFilters);
  };

  const handleApply = async (jobId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

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
      <h1>Browse Jobs</h1>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card search-filters">
        <h3>Search & Filter</h3>
        <form onSubmit={handleSearch}>
          <div className="filter-grid">
            <div className="form-group">
              <label>Search</label>
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Job title, company, keywords..."
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="City, state, or remote"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="type"
                className="form-control"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                className="form-control"
                placeholder="e.g., JavaScript, Python"
                value={filters.skills}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Search Jobs
          </button>
        </form>
      </div>

      <div className="jobs-header">
        <h2>Available Positions ({jobs.length})</h2>
      </div>

      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="no-jobs">
          <p>No jobs found. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="jobs-list">
          {jobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onApply={handleApply}
              onView={handleViewJob}
              showApplyButton={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
