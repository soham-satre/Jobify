# Jobify - Resume-based Job Application System

A full-stack web application that helps users find and apply for jobs based on their resume and skills. Built with React, Node.js, Express, and MongoDB.

## Features

### Authentication & Security
- ✅ User registration and login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Secure HTTP headers with Helmet
- ✅ Rate limiting to prevent abuse
- ✅ Input validation and sanitization
- ✅ Protected routes and API endpoints

### Resume Management
- 📄 Upload resume (PDF, DOC, DOCX formats)
- 📁 File size limit (5MB) for security
- 🔒 Secure file storage
- ✏️ Update or delete resume

### Job Features
- 🔍 Browse all available jobs
- 🎯 Get job matches based on your skills
- 🏢 Search and filter jobs by:
  - Keywords (title, company, description)
  - Location
  - Job type (Full-time, Part-time, Contract, Internship)
  - Required skills
- 📝 View detailed job descriptions

### Application Management
- ✉️ Apply to jobs with one click
- 📋 Track all your applications
- 💼 View application status (Pending, Reviewing, Accepted, Rejected)
- ❌ Withdraw pending applications

### User Profile
- 👤 Manage personal information
- 🛠️ Add and update skills
- 📚 Add work experience
- 📄 Manage resume

## Technology Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobify
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Resume
- `POST /api/resume/upload` - Upload resume (Protected)
- `GET /api/resume` - Get resume info (Protected)
- `DELETE /api/resume` - Delete resume (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get single job
- `GET /api/jobs/matched` - Get jobs matching user skills (Protected)
- `POST /api/jobs` - Create a job (Protected)
- `PUT /api/jobs/:id` - Update a job (Protected)
- `DELETE /api/jobs/:id` - Delete a job (Protected)

### Applications
- `POST /api/applications` - Apply for a job (Protected)
- `GET /api/applications` - Get user's applications (Protected)
- `GET /api/applications/:id` - Get single application (Protected)
- `PUT /api/applications/:id` - Update application status (Protected)
- `DELETE /api/applications/:id` - Delete application (Protected)

## Security Features

1. **Authentication**
   - JWT-based authentication
   - Secure password hashing with bcrypt (10 rounds)
   - Token expiration

2. **Input Validation**
   - Email validation
   - Password strength requirements (min 6 characters)
   - Request body validation with express-validator

3. **File Upload Security**
   - File type validation (PDF, DOC, DOCX only)
   - File size limits (5MB max)
   - Unique filename generation

4. **API Security**
   - Helmet.js for security headers
   - Rate limiting (100 requests per 15 minutes per IP)
   - CORS configuration
   - MongoDB injection prevention

5. **Authorization**
   - Protected routes require valid JWT
   - User-specific data access control
   - Role-based permissions for job posting

## Project Structure

```
Jobify/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── resumeController.js
│   │   │   ├── jobController.js
│   │   │   └── applicationController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── upload.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Job.js
│   │   │   └── Application.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── resumeRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── applicationRoutes.js
│   │   └── server.js
│   ├── uploads/
│   │   └── resumes/
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── PrivateRoute.js
│   │   │   ├── JobCard.js
│   │   │   └── JobCard.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Auth.css
│   │   │   ├── Jobs.js
│   │   │   ├── Jobs.css
│   │   │   ├── MatchedJobs.js
│   │   │   ├── MatchedJobs.css
│   │   │   ├── Profile.js
│   │   │   ├── Profile.css
│   │   │   ├── MyApplications.js
│   │   │   └── MyApplications.css
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── index.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── README.md
```

## Usage Guide

### For Job Seekers

1. **Register an Account**
   - Go to the registration page
   - Provide your name, email, and password
   - Click "Register"

2. **Complete Your Profile**
   - Navigate to the Profile page
   - Add your skills (comma-separated)
   - Add your work experience
   - Upload your resume (PDF, DOC, or DOCX)

3. **Find Jobs**
   - Browse all jobs on the Jobs page
   - Use filters to narrow down results
   - View matched jobs based on your skills

4. **Apply for Jobs**
   - Click "Apply Now" on any job listing
   - Optionally add a cover letter
   - Track your applications on "My Applications" page

### For Employers

1. **Register an Account**
   - Create an account as described above

2. **Post a Job**
   - Use the API to create job listings
   - Include job title, company, location, description
   - Add required skills and job type

3. **Manage Applications**
   - View applications for your posted jobs
   - Update application status
   - Review candidate resumes

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

The build folder will contain the optimized production build.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Enhancements

- [ ] Email notifications for application updates
- [ ] Advanced resume parsing (extract skills automatically)
- [ ] Company profiles and verification
- [ ] Application analytics and insights
- [ ] Job recommendations using ML
- [ ] Chat feature between employers and candidates
- [ ] Video interview scheduling
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ for job seekers and employers