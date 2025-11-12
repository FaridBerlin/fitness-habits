# View logs
docker compose logs -f

# Check container status
docker compose ps

# Stop containers
docker compose down

# Restart containers
docker compose restart

# Check specific service logs
docker compose logs backend
docker compose logs frontend
docker compose logs mongodb

# Rebuild if needed
docker compose up --build