# Quick Start Guide

Get Jobify up and running in 5 minutes!

## Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/soham-satre/Jobify.git
cd Jobify
```

## Step 2: Set Up MongoDB

### Option A: Use Local MongoDB

1. Start MongoDB service:
```bash
# On Ubuntu/Debian
sudo systemctl start mongodb

# On macOS
brew services start mongodb-community

# On Windows
net start MongoDB
```

2. Verify MongoDB is running:
```bash
mongo --eval "db.version()"
```

### Option B: Use MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Use this connection string in the next step

## Step 3: Set Up Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

Update your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobify
JWT_SECRET=my_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a secure random string!

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Backend should now be running on http://localhost:5000

## Step 4: Set Up Frontend

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file
nano .env
```

Update your `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm start
```

Frontend should now be running on http://localhost:3000

## Step 5: Seed Sample Data (Optional)

To add sample job listings:

```bash
cd backend
node seed.js
```

This will create 8 sample job listings in your database.

## Step 6: Test the Application

1. Open your browser and go to http://localhost:3000
2. Click "Register" to create a new account
3. Fill in your details and register
4. Go to your profile and:
   - Add your skills (e.g., "JavaScript, React, Node.js")
   - Upload a resume (PDF, DOC, or DOCX)
5. Browse jobs at http://localhost:3000/jobs
6. View matched jobs based on your skills
7. Apply to jobs you're interested in
8. Track your applications

## Common Issues & Solutions

### Backend won't start

**Error: "Cannot connect to MongoDB"**
- Make sure MongoDB is running
- Check your MongoDB URI in `.env`
- Verify database permissions

**Error: "Port 5000 already in use"**
- Change the PORT in `.env` to another port (e.g., 5001)
- Or stop the process using port 5000:
```bash
# On Mac/Linux
lsof -ti:5000 | xargs kill

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend won't start

**Error: "npm ERR! Missing script: start"**
- Make sure you're in the `frontend` directory
- Run `npm install` again

**Error: "Module not found"**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Can't register/login

**Error: "Network Error" or "Failed to fetch"**
- Make sure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check for CORS errors in browser console

### File upload not working

**Error: "Upload failed"**
- Check that `uploads/resumes/` directory exists in backend
- Verify file is PDF, DOC, or DOCX
- Ensure file is under 5MB
- Check backend logs for errors

## Next Steps

### For Job Seekers
1. ✅ Complete your profile with skills
2. ✅ Upload your resume
3. ✅ Browse and search for jobs
4. ✅ View matched jobs based on your skills
5. ✅ Apply to jobs
6. ✅ Track your applications

### For Employers
1. Use API to create job postings
2. Review applications
3. Update application status

### For Developers
1. Read the [README.md](README.md) for detailed documentation
2. Check [SECURITY.md](SECURITY.md) for security guidelines
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
4. Explore the codebase and make improvements

## API Testing

You can test the API using tools like:

### Using curl

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get jobs
curl http://localhost:5000/api/jobs
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the API endpoints
3. Test each endpoint

### Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Create requests for each endpoint
3. Test the API

## Development Tips

### Hot Reload

Both backend and frontend support hot reload:
- Backend: Uses `nodemon` in dev mode
- Frontend: React's built-in hot reload

Just save your files and see changes instantly!

### Debugging

#### Backend Debugging
```bash
# Add console.logs in your code
console.log('Debug:', variable);

# Or use Node.js debugger
node --inspect src/server.js
```

#### Frontend Debugging
- Use browser DevTools (F12)
- Check Console for errors
- Use React DevTools extension

### Code Style

- Backend follows Node.js conventions
- Frontend follows React/JavaScript best practices
- Use meaningful variable names
- Comment complex logic

## Getting Help

If you encounter any issues:

1. Check this Quick Start Guide
2. Read the main [README.md](README.md)
3. Check the [SECURITY.md](SECURITY.md) for security-related issues
4. Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
5. Open an issue on GitHub

## What's Next?

Now that you have Jobify running, you can:

1. **Customize the UI**: Modify React components and CSS
2. **Add features**: Email notifications, advanced search, etc.
3. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to production
4. **Contribute**: Submit pull requests with improvements

Happy coding! 🚀
