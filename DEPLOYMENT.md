# Deployment Guide

This guide covers deploying the Jobify application to various platforms.

## Prerequisites

- Node.js 14+ installed
- MongoDB database (local or cloud)
- Git installed
- Domain name (optional, for production)

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobify?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_very_secure_random_secret_key_here
JWT_EXPIRE=7d

# Client URL (for CORS)
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Deployment Options

### Option 1: Deploy to Heroku

#### Backend Deployment

1. Create a Heroku account and install Heroku CLI

2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
cd backend
heroku create jobify-backend
```

4. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLIENT_URL=https://your-frontend.herokuapp.com
```

5. Create a `Procfile` in the backend directory:
```
web: node src/server.js
```

6. Deploy:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Frontend Deployment

1. Build the React app:
```bash
cd frontend
npm run build
```

2. Deploy to Heroku (using static buildpack):
```bash
heroku create jobify-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main
```

Or deploy to Netlify/Vercel (recommended for frontend).

### Option 2: Deploy to DigitalOcean/AWS/GCP

#### Backend Deployment

1. Set up a Ubuntu server (DigitalOcean Droplet, EC2, etc.)

2. SSH into your server:
```bash
ssh root@your_server_ip
```

3. Install Node.js and MongoDB:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb
```

4. Clone your repository:
```bash
git clone https://github.com/your-username/Jobify.git
cd Jobify/backend
```

5. Install dependencies:
```bash
npm install --production
```

6. Set up environment variables:
```bash
nano .env
# Add your production environment variables
```

7. Install PM2 for process management:
```bash
npm install -g pm2
pm2 start src/server.js --name jobify-backend
pm2 startup
pm2 save
```

8. Set up Nginx as reverse proxy:
```bash
sudo apt-get install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/jobify

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/jobify /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. Set up SSL with Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Frontend Deployment

##### Option A: Deploy on same server with Nginx

1. Build the React app:
```bash
cd frontend
npm run build
```

2. Copy build to Nginx directory:
```bash
sudo cp -r build/* /var/www/html/
```

3. Update Nginx config to serve React app

##### Option B: Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd frontend
npm run build
netlify deploy --prod
```

##### Option C: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

### Option 3: Docker Deployment

#### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]
```

#### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: jobify-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  backend:
    build: ./backend
    container_name: jobify-backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:password@mongodb:27017/jobify?authSource=admin
      - JWT_SECRET=${JWT_SECRET}
      - CLIENT_URL=http://localhost:3000
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: jobify-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Deploy with Docker Compose:
```bash
docker-compose up -d
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Set up database user
4. Whitelist IP addresses
5. Get connection string
6. Update MONGODB_URI in .env

### Option 2: Local MongoDB

1. Install MongoDB:
```bash
# Ubuntu
sudo apt-get install mongodb

# macOS
brew tap mongodb/brew
brew install mongodb-community
```

2. Start MongoDB:
```bash
sudo systemctl start mongodb
```

3. Create database and user:
```bash
mongo
> use jobify
> db.createUser({
  user: "jobify_user",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "jobify" }]
})
```

## Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test all API endpoints
- [ ] Test frontend functionality
- [ ] Verify database connection
- [ ] Set up SSL/HTTPS
- [ ] Configure domain DNS
- [ ] Set up monitoring (e.g., PM2, New Relic)
- [ ] Configure backups
- [ ] Set up logging
- [ ] Test file upload functionality
- [ ] Verify email notifications (if implemented)
- [ ] Run security audit
- [ ] Load testing
- [ ] Set up CI/CD pipeline

## Monitoring & Maintenance

### Set up monitoring with PM2

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Monitor logs
pm2 logs

# Monitor resources
pm2 monit
```

### Database Backups

```bash
# Create backup script
nano /home/backup-mongodb.sh

#!/bin/bash
TIMESTAMP=$(date +%F-%H%M)
BACKUP_DIR="/home/backups/mongodb"
mkdir -p $BACKUP_DIR
mongodump --uri="$MONGODB_URI" --out=$BACKUP_DIR/backup-$TIMESTAMP
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;

# Make executable
chmod +x /home/backup-mongodb.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/backup-mongodb.sh
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify environment variables
- Check logs: `pm2 logs` or `heroku logs --tail`
- Ensure port is not in use

### Frontend can't connect to backend
- Verify REACT_APP_API_URL is correct
- Check CORS configuration
- Verify backend is running
- Check network/firewall settings

### File uploads failing
- Check uploads directory exists and is writable
- Verify file size limits
- Check multer configuration
- Review server logs

### Database connection issues
- Verify MongoDB URI
- Check database user permissions
- Ensure MongoDB is running
- Check network connectivity

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy, AWS ALB)
- Deploy multiple backend instances
- Use Redis for session management
- Implement centralized logging

### Database Scaling
- MongoDB sharding
- Read replicas
- Connection pooling
- Indexing optimization

### CDN for Static Assets
- Use CDN for frontend (CloudFlare, AWS CloudFront)
- Serve uploaded files via CDN
- Enable caching

## Security Hardening

See SECURITY.md for detailed security guidelines.

Key points:
- Enable firewall (ufw)
- Disable root login
- Set up fail2ban
- Regular security updates
- Use strong passwords
- Enable SSL/TLS
- Regular backups
- Monitor logs for suspicious activity

## Support

For deployment issues, consult:
- Backend logs
- Frontend console
- Database logs
- Nginx/Apache logs
- Cloud provider documentation
