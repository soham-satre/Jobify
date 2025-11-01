# Security Documentation

## Overview

This document outlines the security measures implemented in the Jobify application to protect against common vulnerabilities and attacks.

## Security Features

### 1. Authentication & Authorization

#### JWT-based Authentication
- JSON Web Tokens (JWT) are used for stateless authentication
- Tokens expire after 7 days (configurable via `JWT_EXPIRE` env variable)
- Tokens are stored in localStorage on the client side
- All protected routes require valid JWT in Authorization header

#### Password Security
- Passwords are hashed using bcryptjs with 10 salt rounds
- Minimum password length: 6 characters
- Passwords are never stored in plain text
- Password fields are excluded from query results by default (`select: false`)

#### Authorization
- User-specific data access control
- Job ownership verification before updates/deletes
- Application access restricted to owner or job poster

### 2. Input Validation & Sanitization

#### Server-side Validation
- Express-validator is used for all input validation
- Email format validation with normalization
- Required field validation
- Custom validation rules for complex fields

#### Data Sanitization
- Email normalization (lowercase, trimmed)
- String trimming for text inputs
- Array validation for skills
- Mongoose schema validation

### 3. File Upload Security

#### File Type Restrictions
- Only PDF, DOC, and DOCX files are accepted
- MIME type validation
- File extension validation
- Both checks must pass

#### File Size Limits
- Maximum file size: 5MB
- Prevents DoS attacks via large file uploads
- Memory efficient file handling

#### File Storage
- Unique filename generation using timestamp + random number
- Files stored outside web root
- No direct file access via URLs
- File paths validated before operations

### 4. API Security

#### Rate Limiting
- 100 requests per 15 minutes per IP address
- Applied to all API routes
- Prevents brute force attacks
- Mitigates DoS attacks

#### Helmet.js Security Headers
- Content Security Policy (CSP)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security (HSTS)
- Removes X-Powered-By header

#### CORS Configuration
- Configurable allowed origins
- Credentials support enabled
- Prevents unauthorized cross-origin requests

### 5. Database Security

#### MongoDB Security
- Mongoose schema validation
- No direct query string usage
- Parameterized queries prevent injection
- Unique indexes for email fields
- Duplicate application prevention

#### Connection Security
- Connection string stored in environment variables
- No hardcoded credentials
- TLS/SSL support for production

### 6. Error Handling

#### Secure Error Messages
- Generic error messages to clients
- Detailed errors logged server-side only
- No stack traces in production
- Proper HTTP status codes

#### Error Logging
- Errors logged to console (can be extended to file/service)
- Request context preserved
- Sensitive data excluded from logs

### 7. Environment Configuration

#### Environment Variables
- All sensitive data in .env files
- .env files excluded from version control
- .env.example provided for reference
- Different configs for dev/staging/production

#### Required Environment Variables
- `JWT_SECRET`: Strong random string for JWT signing
- `MONGODB_URI`: Database connection string
- `PORT`: Server port number
- `NODE_ENV`: Environment mode

### 8. Dependency Security

#### Updated Dependencies
All dependencies are updated to secure versions:
- mongoose: ^7.8.4 (patched search injection vulnerabilities)
- multer: ^2.0.2 (patched DoS vulnerabilities)
- axios: ^1.12.0 (patched SSRF and DoS vulnerabilities)
- express-validator: ^7.0.1 (latest stable)
- helmet: ^7.0.0 (latest stable)

#### Dependency Monitoring
- Regular dependency audits recommended
- Use `npm audit` to check for vulnerabilities
- Keep dependencies up to date

## Security Best Practices for Deployment

### 1. Environment Setup

```bash
# Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Use this value for JWT_SECRET in .env
```

### 2. MongoDB Configuration

```javascript
// Use authenticated connection
MONGODB_URI=mongodb://username:password@host:port/database?authSource=admin

// Enable TLS/SSL for production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### 3. HTTPS Configuration

```javascript
// Always use HTTPS in production
// Configure reverse proxy (nginx/Apache) with SSL certificate
// Use Let's Encrypt for free SSL certificates
```

### 4. Additional Security Headers

```javascript
// Can be added to server.js
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
  }
}));
```

### 5. Session Security

```javascript
// For production, consider:
// - Redis for token blacklisting
// - Refresh token rotation
// - Device fingerprinting
// - IP whitelisting for admin routes
```

### 6. File Upload Best Practices

```javascript
// Additional security measures:
// - Virus scanning (ClamAV integration)
// - Cloud storage (AWS S3, Google Cloud Storage)
// - CDN for file serving
// - Separate domain for uploads
```

### 7. Logging & Monitoring

```javascript
// Implement:
// - Winston/Bunyan for structured logging
// - Log rotation
// - Error tracking (Sentry, Rollbar)
// - Performance monitoring (New Relic, Datadog)
// - Security event alerts
```

### 8. Backup & Recovery

```javascript
// Implement:
// - Automated database backups
// - Disaster recovery plan
// - Data retention policies
// - Encrypted backups
```

## Security Checklist

### Pre-deployment
- [ ] Change default JWT_SECRET to strong random value
- [ ] Enable HTTPS/TLS
- [ ] Configure MongoDB authentication
- [ ] Set NODE_ENV=production
- [ ] Remove development dependencies
- [ ] Enable security headers
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Implement logging
- [ ] Set up monitoring

### Post-deployment
- [ ] Regular security audits
- [ ] Dependency updates
- [ ] Log monitoring
- [ ] Performance monitoring
- [ ] Backup verification
- [ ] Penetration testing
- [ ] Security training for team

## Known Limitations

1. **Client-side Token Storage**
   - Tokens stored in localStorage (vulnerable to XSS)
   - Consider httpOnly cookies for production

2. **File Storage**
   - Files stored on local filesystem
   - Consider cloud storage (S3, GCS) for production

3. **Rate Limiting**
   - IP-based rate limiting (can be bypassed with proxy)
   - Consider user-based rate limiting

4. **Session Management**
   - No token refresh mechanism
   - No token revocation/blacklisting
   - Consider implementing for production

## Vulnerability Reporting

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Email security concerns to: [security@example.com]
3. Include detailed information about the vulnerability
4. Allow time for fix before public disclosure

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)

## Security Updates

### Version 1.0.0 (Current)
- Implemented JWT authentication
- Added password hashing
- Configured security headers
- Implemented rate limiting
- Added input validation
- Secured file uploads
- Updated vulnerable dependencies
