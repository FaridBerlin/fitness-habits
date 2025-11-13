# Environment Configuration for Fitness Habits Tracker

## 🔐 Security Warning

**NEVER commit the `.env` file to GitHub!** It contains sensitive credentials.

## 📋 Environment Variables

### Required Variables

#### MongoDB Connection

```bash
# Production (MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Fitness-11-DB?retryWrites=true&w=majority

# Local Development
MONGO_URI=mongodb://localhost:27017/Fitness-11-DB

# Docker (uses containerized MongoDB)
MONGO_URI=mongodb://mongodb:27017/Fitness-11-DB
```

#### JWT Secret

```bash
# Production (generate with: openssl rand -hex 32)
JWT_SECRET=your_64_character_random_hex_string

# Development (not secure, for local testing only)
JWT_SECRET=development_secret_key
```

#### Server Configuration

```bash
PORT=5000
NODE_ENV=production  # or 'development'
```

## 🚀 Setup Instructions

### 1. Create `.env` file

```bash
cd backend
cp .env.sample .env
```

### 2. Edit `.env` with your values

```bash
# Use your editor
nano .env
```

### 3. For MongoDB Atlas:

1. Go to https://cloud.mongodb.com
2. Create a cluster
3. Create a database user
4. Get connection string
5. Replace `<password>` and database name

### 4. Generate JWT Secret

```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows (PowerShell)
[System.BitConverter]::ToString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).Replace("-", "").ToLower()

# Or use online generator (use trusted sites only)
```

## 🐳 Docker Usage

### Using Environment Variables in Docker

The `docker-compose.yml` reads from your `.env` file:

```yaml
environment:
  MONGO_URI: ${MONGO_URI}
  JWT_SECRET: ${JWT_SECRET}
  NODE_ENV: ${NODE_ENV}
  PORT: ${PORT}
```

### Running with Custom Environment

```bash
# Use .env file (automatic)
docker compose up -d

# Override specific variables
MONGO_URI=mongodb://custom:27017/db docker compose up -d

# Use different env file
docker compose --env-file .env.production up -d
```

## 📝 Different Environments

### Local Development (.env.local)

```bash
MONGO_URI=mongodb://localhost:27017/Fitness-11-DB
PORT=5000
JWT_SECRET=local_dev_secret_not_for_production
NODE_ENV=development
```

### Docker Development (.env.docker)

```bash
MONGO_URI=mongodb://mongodb:27017/Fitness-11-DB
PORT=5000
JWT_SECRET=docker_dev_secret
NODE_ENV=development
```

### Production (.env.production)

```bash
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/Fitness-11-DB?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=e8ba985cd58cdab1559583b2c91ee9a8b3a4d8b079c7efcf78f57b79cbf09177
NODE_ENV=production
```

## ✅ Verification

### Test MongoDB Connection

```bash
# From your local machine
mongosh "mongodb+srv://username:password@cluster.mongodb.net/Fitness-11-DB"

# From Docker container
docker exec -it fitness-tracker-backend sh
node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => console.log('Connected!')).catch(console.error)"
```

### Test Backend with New Config

```bash
cd backend
npm run dev

# Should see:
# ✅ MongoDB connected to: Fitness-11-DB
# 🚀 Backend running on http://localhost:5000
```

## ⚠️ Important Security Notes

1. **Never commit `.env`** - Already in `.gitignore` ✅
2. **Use different secrets** for dev/prod
3. **Rotate JWT secrets** periodically
4. **Use strong passwords** for MongoDB users
5. **Enable IP allowlist** in MongoDB Atlas
6. **Use environment-specific** `.env` files

## 🔄 Switching Environments

### Switch to Production

```bash
# Stop containers
docker compose down

# Update .env with production values
# Then restart
docker compose up -d
```

### Switch to Local Development

```bash
# Comment out production MONGO_URI
# Uncomment local MONGO_URI
# Restart services
npm run dev
```

## 📚 Additional Resources

- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
