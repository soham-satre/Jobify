import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            Jobify
          </Link>
          
          <div className="navbar-links">
            {isAuthenticated ? (
              <>
                <Link to="/jobs" className="nav-link">Jobs</Link>
                <Link to="/matched-jobs" className="nav-link">Matched Jobs</Link>
                <Link to="/my-applications" className="nav-link">My Applications</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/jobs" className="nav-link">Jobs</Link>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
