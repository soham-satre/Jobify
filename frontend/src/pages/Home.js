import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Welcome to Jobify</h1>
          <p className="hero-subtitle">
            Upload your resume and find the perfect job match
          </p>
          <p className="hero-description">
            Jobify helps you discover job opportunities that match your skills and experience.
            Upload your resume, browse available positions, and apply with just a few clicks.
          </p>
          
          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <Link to="/jobs" className="btn btn-primary btn-large">
                  Browse Jobs
                </Link>
                <Link to="/matched-jobs" className="btn btn-success btn-large">
                  View Matched Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/jobs" className="btn btn-secondary btn-large">
                  Browse Jobs
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Upload Resume</h3>
              <p>Upload your resume in PDF or DOC format</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Find Jobs</h3>
              <p>Search and filter jobs based on your preferences</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Get Matched</h3>
              <p>Discover jobs that match your skills</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✉️</div>
              <h3>Apply Easily</h3>
              <p>Apply to jobs with a single click</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
