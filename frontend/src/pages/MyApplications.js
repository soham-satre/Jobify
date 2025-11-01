import React, { useState, useEffect } from 'react';
import { applicationService } from '../services';
import './MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await applicationService.getMy();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Error loading applications:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to load applications' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      await applicationService.delete(id);
      setApplications(applications.filter(app => app._id !== id));
      setMessage({ 
        type: 'success', 
        text: 'Application withdrawn successfully' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to withdraw application' 
      });
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      case 'reviewing':
        return 'status-reviewing';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="container">
      <h1>My Applications</h1>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="card">
          <p className="no-applications">
            You haven't applied to any jobs yet. 
            <a href="/jobs"> Browse jobs</a> to get started!
          </p>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map(application => (
            <div key={application._id} className="application-card card">
              <div className="application-header">
                <div>
                  <h3>{application.job?.title || 'Job Deleted'}</h3>
                  <p className="company">{application.job?.company}</p>
                  <p className="location">📍 {application.job?.location}</p>
                </div>
                <div className={`status ${getStatusClass(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
              </div>

              <div className="application-details">
                <p className="applied-date">
                  Applied: {new Date(application.appliedAt).toLocaleDateString()}
                </p>
                
                {application.coverLetter && (
                  <div className="cover-letter">
                    <strong>Cover Letter:</strong>
                    <p>{application.coverLetter}</p>
                  </div>
                )}
              </div>

              <div className="application-actions">
                {application.status === 'pending' && (
                  <button 
                    onClick={() => handleDelete(application._id)}
                    className="btn btn-danger"
                  >
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
