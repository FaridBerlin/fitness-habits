# Pushing Fitness Habits Tracker to Docker Hub

## 📋 Prerequisites

- ✅ Docker Desktop installed
- ✅ Docker Hub account created (username: faridberlin)
- ✅ Docker Hub repository created

## 🚀 Step-by-Step Guide

### 1. Login to Docker Hub

```bash
docker login
# Enter your Docker Hub username: faridberlin
# Enter your Docker Hub password: [your password]
```

### 2. Tag Your Images

Tag the backend image:

```bash
docker tag fitness-tracker-11-11-backend:latest faridberlin/fitness-habits-backend:latest
docker tag fitness-tracker-11-11-backend:latest faridberlin/fitness-habits-backend:v1.0
```

Tag the frontend image:

```bash
docker tag fitness-tracker-11-11-frontend:latest faridberlin/fitness-habits-frontend:latest
docker tag fitness-tracker-11-11-frontend:latest faridberlin/fitness-habits-frontend:v1.0
```

### 3. Push to Docker Hub

Push backend:

```bash
docker push faridberlin/fitness-habits-backend:latest
docker push faridberlin/fitness-habits-backend:v1.0
```

Push frontend:

```bash
docker push faridberlin/fitness-habits-frontend:latest
docker push faridberlin/fitness-habits-frontend:v1.0
```

### 4. Verify on Docker Hub

Visit: https://hub.docker.com/u/faridberlin

---

## 🔄 Alternative: Use docker-compose.yml for Easy Pushing

Update your `docker-compose.yml` to use Docker Hub images:

```yaml
services:
  backend:
    image: faridberlin/fitness-habits-backend:latest
    build:
      context: ./backend
      dockerfile: Dockerfile
    # ... rest of config

  frontend:
    image: faridberlin/fitness-habits-frontend:latest
    build:
      context: ./frontend
      dockerfile: Dockerfile
    # ... rest of config
```

Then build and push:

```bash
docker compose build
docker compose push
```

---

## 📦 Quick Commands (Copy-Paste Ready)

```bash
# 1. Login
docker login

# 2. Tag images
docker tag fitness-tracker-11-11-backend:latest faridberlin/fitness-habits-backend:latest
docker tag fitness-tracker-11-11-frontend:latest faridberlin/fitness-habits-frontend:latest

# 3. Push to Docker Hub
docker push faridberlin/fitness-habits-backend:latest
docker push faridberlin/fitness-habits-frontend:latest
```

---

## 🎯 Pull from Docker Hub Later

Anyone (including you on another machine) can pull and run:

```bash
docker pull faridberlin/fitness-habits-backend:latest
docker pull faridberlin/fitness-habits-frontend:latest
```

Or use docker-compose with the updated images!

---

## ⚠️ Important Notes

1. **MongoDB** is NOT pushed - it uses the official `mongo:7-jammy` image
2. **Tag versions** (like v1.0) help track releases
3. **latest** tag auto-updates with newest version
4. Your **source code is NOT in the image** - only the built application

---

## 🔐 Security Tip

Never push images with sensitive data like:

- `.env` files with real secrets
- Database credentials
- API keys

Your `.dockerignore` already excludes these! ✅
