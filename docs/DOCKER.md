# Docker Setup for Fitness Habits Tracker

This document explains how to run the Fitness Habits Tracker application using Docker and Docker Compose.

## 🐳 Prerequisites

- **Docker Desktop** installed and running
- **Docker Compose** (usually included with Docker Desktop)
- At least **4GB RAM** allocated to Docker

## 📁 Project Structure

```
fitness-habits/
├── docker-compose.yml      # Main orchestration file
├── backend/
│   ├── Dockerfile         # Backend container configuration
│   ├── .dockerignore      # Files to exclude from backend build
│   └── ...               # Backend source code
├── frontend/
│   ├── Dockerfile         # Frontend container configuration
│   ├── nginx.conf         # Nginx configuration for React app
│   └── .dockerignore      # Files to exclude from frontend build
└── docs/
    └── DOCKER.md         # This file
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/FaridBerlin/fitness-habits.git
cd fitness-habits
```

### 2. Start All Services

```bash
docker-compose up -d
```

This will:

- ✅ Start MongoDB database
- ✅ Build and start the backend API
- ✅ Build and start the frontend React app
- ✅ Set up networking between services

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017 (accessible from host)

### 4. Check Container Status

```bash
docker-compose ps
```

## 🛠 Available Commands

### Development Mode (with live reload)

```bash
# Start services in foreground (see logs)
docker-compose up

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Stop and Cleanup

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

### Rebuild After Code Changes

```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild all services
docker-compose build

# Rebuild and restart
docker-compose up --build
```

## 🏗 Architecture

### Services Overview

1. **mongodb** - MongoDB 7 database

   - Container name: `fitness-tracker-mongodb`
   - Database: `Fitness-11-DB`
   - Data persists in Docker volume

2. **backend** - Node.js/Express API

   - Container name: `fitness-tracker-backend`
   - Port: 5000
   - Health check endpoint: `/healthz`

3. **frontend** - React/Nginx web app
   - Container name: `fitness-tracker-frontend`
   - Port: 3000 (maps to container port 80)
   - Proxies API calls to backend

### Network Configuration

All services communicate through `fitness-network`:

- Frontend can reach backend at `http://backend:5000`
- Backend connects to MongoDB at `mongodb://mongodb:27017/Fitness-11-DB`

## 🔧 Configuration

### Environment Variables

The Docker setup uses these environment variables:

**Backend:**

- `MONGO_URI=mongodb://mongodb:27017/Fitness-11-DB`
- `PORT=5000`
- `JWT_SECRET=your_super_secret_jwt_key_change_this_in_production`
- `NODE_ENV=production`

### Customizing Configuration

To modify environment variables, edit the `environment` section in `docker-compose.yml`:

```yaml
backend:
  environment:
    MONGO_URI: mongodb://mongodb:27017/Fitness-11-DB
    JWT_SECRET: your_custom_jwt_secret_here
```

### Database Persistence

MongoDB data is stored in a Docker volume named `mongodb_data`. To backup:

```bash
# Create backup
docker run --rm -v fitness-habits_mongodb_data:/data/db -v $(pwd):/backup mongo:7-jammy tar czf /backup/mongodb_backup.tar.gz -C /data/db .

# Restore backup
docker run --rm -v fitness-habits_mongodb_data:/data/db -v $(pwd):/backup mongo:7-jammy tar xzf /backup/mongodb_backup.tar.gz -C /data/db
```

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**

```bash
# Check what's using the port
lsof -i :3000
lsof -i :5000

# Stop conflicting services or change ports in docker-compose.yml
```

**2. MongoDB Connection Issues**

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

**3. Build Failures**

```bash
# Clear Docker cache
docker system prune -f

# Rebuild without cache
docker-compose build --no-cache
```

**4. Permission Issues**

```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Health Checks

All services include health checks. Monitor them with:

```bash
# Check all service health
docker-compose ps

# Check specific service
docker inspect fitness-tracker-backend | grep -A 10 "Health"
```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100

# Export logs to file
docker-compose logs > docker-logs.txt
```

## 🔒 Security Considerations

### Production Deployment

For production use, consider:

1. **Change JWT Secret**: Use a strong, random secret
2. **Database Security**: Add MongoDB authentication
3. **HTTPS**: Configure SSL/TLS certificates
4. **Environment Variables**: Use Docker secrets or external config
5. **Network Security**: Configure proper firewall rules

### Database Security

To add MongoDB authentication, modify `docker-compose.yml`:

```yaml
mongodb:
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: secure_password
  command: --auth
```

## 📊 Monitoring

### Resource Usage

```bash
# View container resource usage
docker stats

# View specific containers
docker stats fitness-tracker-backend fitness-tracker-frontend
```

### Database Management

```bash
# Connect to MongoDB from host
mongosh mongodb://localhost:27017/Fitness-11-DB

# Or connect to container
docker exec -it fitness-tracker-mongodb mongosh Fitness-11-DB
```

## 🚀 Deployment Options

### Local Development

- Use `docker-compose up` for development with hot reload
- Mount source code volumes for live editing

### Production Deployment

- Use Docker Swarm or Kubernetes
- Configure reverse proxy (nginx, traefik)
- Set up CI/CD pipelines
- Use managed databases (MongoDB Atlas)

### Cloud Platforms

- **AWS**: ECS, EKS, or Elastic Beanstalk
- **Google Cloud**: Cloud Run or GKE
- **Azure**: Container Instances or AKS
- **Heroku**: Container registry

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
- [Node.js Docker](https://hub.docker.com/_/node)

## 🆘 Support

If you encounter issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review Docker and container logs
3. Ensure all prerequisites are met
4. Check GitHub issues for similar problems

---

**Happy Dockerizing! 🐳**
