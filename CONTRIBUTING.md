# Contributing to Jobify

Thank you for your interest in contributing to Jobify! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Title**: Clear and descriptive title
- **Description**: Detailed description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: OS, Node version, Browser, etc.

Example:
```markdown
### Bug: Login fails with valid credentials

**Description:** Unable to login with correct email and password

**Steps to Reproduce:**
1. Go to /login
2. Enter email: test@example.com
3. Enter password: Test123!
4. Click Login

**Expected:** User should be logged in and redirected to dashboard

**Actual:** Error message "Invalid credentials" is shown

**Environment:**
- OS: macOS 12.0
- Node: v18.0.0
- Browser: Chrome 98
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the enhancement
- Explain why this enhancement would be useful
- List any examples of how it works in other apps

### Pull Requests

1. **Fork the Repository**
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/Jobify.git
cd Jobify
```

2. **Create a Branch**
```bash
# Create a feature branch
git checkout -b feature/amazing-feature

# Or a bug fix branch
git checkout -b fix/bug-description
```

3. **Make Your Changes**
- Follow the code style guidelines
- Write clear commit messages
- Add tests if applicable
- Update documentation

4. **Test Your Changes**
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Manual testing
npm start
```

5. **Commit Your Changes**
```bash
git add .
git commit -m "Add amazing feature"
```

Follow commit message conventions:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add email notifications for job applications
fix: resolve resume upload issue on Safari
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add tests for job search functionality
chore: update dependencies
```

6. **Push to Your Fork**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**
- Go to the original repository
- Click "New Pull Request"
- Select your fork and branch
- Fill in the PR template
- Submit the pull request

### Pull Request Guidelines

- **One feature per PR**: Keep PRs focused on a single feature or fix
- **Small PRs**: Smaller PRs are easier to review and merge
- **Tests**: Include tests for new features
- **Documentation**: Update docs if needed
- **No breaking changes**: Unless discussed and approved
- **Code quality**: Follow style guidelines

## Development Setup

### Prerequisites
- Node.js 14+
- MongoDB 4.4+
- Git

### Setup
```bash
# Clone repository
git clone https://github.com/soham-satre/Jobify.git
cd Jobify

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your settings

# Frontend setup
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your settings
```

### Running Locally
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Code Style Guidelines

### JavaScript/Node.js

- Use ES6+ features
- Use `const` and `let`, not `var`
- Use arrow functions when appropriate
- Use async/await instead of callbacks
- Use template literals for string interpolation

```javascript
// Good
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

// Bad
var getUserById = function(id, callback) {
  User.findById(id, function(err, user) {
    callback(err, user);
  });
};
```

### React

- Use functional components with hooks
- Use destructuring for props
- Keep components small and focused
- Use PropTypes or TypeScript for type checking

```javascript
// Good
const JobCard = ({ job, onApply }) => {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <button onClick={() => onApply(job.id)}>Apply</button>
    </div>
  );
};

// Bad
class JobCard extends React.Component {
  render() {
    return (
      <div className="job-card">
        <h3>{this.props.job.title}</h3>
      </div>
    );
  }
}
```

### CSS

- Use meaningful class names
- Follow BEM naming convention when appropriate
- Keep styles modular
- Use CSS variables for theme colors

```css
/* Good */
.job-card {
  background: white;
  padding: 20px;
}

.job-card__title {
  font-size: 20px;
  color: var(--primary-color);
}

/* Bad */
.jc {
  background: #fff;
  padding: 20px;
}
```

### File Structure

- Keep files organized by feature
- Use clear, descriptive filenames
- Group related files together

```
backend/
  src/
    controllers/    # Request handlers
    models/         # Database models
    routes/         # API routes
    middleware/     # Custom middleware
    utils/          # Utility functions
    
frontend/
  src/
    components/     # Reusable components
    pages/          # Page components
    services/       # API services
    context/        # React context
    utils/          # Utility functions
```

## Testing

### Backend Tests

```javascript
// Example test
const request = require('supertest');
const app = require('../src/server');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

### Frontend Tests

```javascript
// Example test
import { render, screen } from '@testing-library/react';
import JobCard from './JobCard';

test('renders job card', () => {
  const job = {
    title: 'Software Engineer',
    company: 'Tech Corp'
  };
  
  render(<JobCard job={job} />);
  expect(screen.getByText('Software Engineer')).toBeInTheDocument();
});
```

## Documentation

### Code Comments

- Comment complex logic
- Use JSDoc for functions
- Keep comments up to date

```javascript
/**
 * Apply for a job
 * @param {string} jobId - The ID of the job to apply for
 * @param {Object} applicationData - Application details
 * @returns {Promise<Object>} Application object
 */
const applyForJob = async (jobId, applicationData) => {
  // Implementation
};
```

### README Updates

When adding features, update:
- Feature list
- API documentation
- Installation steps
- Usage examples

## Community

### Getting Help

- GitHub Issues: For bugs and feature requests
- Discussions: For questions and general discussion

### Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## Review Process

1. **Automated Checks**: CI/CD runs tests and linters
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Release**: Changes included in next release

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Check existing documentation
- Reach out to maintainers

Thank you for contributing to Jobify! 🎉
