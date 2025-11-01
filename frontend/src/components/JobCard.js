import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onApply, onView, showApplyButton = true }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">📍 {job.location}</p>
      <p className="job-type">{job.type}</p>
      
      {job.skills && job.skills.length > 0 && (
        <div className="skills">
          {job.skills.slice(0, 5).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
      
      {job.salary && (
        <p className="salary">
          {job.salary.currency} {job.salary.min?.toLocaleString()} - {job.salary.max?.toLocaleString()}
        </p>
      )}
      
      <div className="job-actions">
        <button onClick={() => onView(job._id)} className="btn btn-secondary">
          View Details
        </button>
        {showApplyButton && onApply && (
          <button onClick={() => onApply(job._id)} className="btn btn-primary">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
