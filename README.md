# Fitness Habits Tracker

A full-stack web application for tracking daily habits and building healthy routines. Built with React (frontend) and Node.js/Express (backend) with MongoDB.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Habit Management**: Create, update, and delete habits
- **Daily Tracking**: Log habit completion with notes and counts
- **Streak Tracking**: Monitor current and all-time streaks
- **Weekly Statistics**: View weekly completion summaries
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Immediate feedback on habit progress

## 🛠 Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **CSS** - Custom styling

### Backend

- **Node.js 22** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
fitness-habits/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HabitForm.jsx
│   │   │   ├── HabitList.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── StreaksStats.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # App entry point
│   │   └── styles.css       # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── models/          # MongoDB models
│   │   │   ├── User.js
│   │   │   ├── Habit.js
│   │   │   └── HabitEntry.js
│   │   ├── routes/          # API routes
│   │   │   ├── auth.js
│   │   │   ├── habits.js
│   │   │   └── stats.js
│   │   ├── middlewares/
│   │   │   └── auth.js      # JWT authentication
│   │   ├── server.js        # Main server file
│   │   └── db.js            # Database connection
│   ├── .env                 # Environment variables
│   └── package.json
│
└── README.md
```

## 🗄 Database Schema

### Users Collection

```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String,
  timezone: String (default: 'UTC'),
  createdAt: Date
}
```

### Habits Collection

```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  description: String,
  frequency: String (enum: ['daily', 'weekly', 'custom']),
  target: Number (default: 1),
  category: String (enum: ['fitness', 'health', 'productivity', ...]),
  color: String (default: '#4CAF50'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### HabitEntries Collection

```javascript
{
  habitId: ObjectId (ref: Habit),
  userId: ObjectId (ref: User),
  date: Date (required),
  completed: Boolean (default: false),
  count: Number (default: 1),
  notes: String,
  createdAt: Date
}
```

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** (v22 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/FaridBerlin/fitness-habits.git
cd fitness-habits
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.sample .env

# Edit .env with your configuration
nano .env
```

**Required environment variables:**

```env
MONGO_URI=mongodb://localhost:27017/Fitness-11-DB
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Linux/Mac
sudo systemctl start mongod

# Or using brew (Mac)
brew services start mongodb-community
```

### 5. Run the Application

**Start Backend (Terminal 1):**

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

**Start Frontend (Terminal 2):**

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## � Docker Setup (Recommended)

For the easiest setup, use Docker and Docker Compose:

### Prerequisites

- **Docker Desktop** installed and running
- **Docker Compose** (included with Docker Desktop)

### Quick Start with Docker

```bash
# Clone repository
git clone https://github.com/FaridBerlin/fitness-habits.git
cd fitness-habits

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Docker Commands

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up --build
```

For detailed Docker instructions, see [`docs/DOCKER.md`](docs/DOCKER.md).

## �📡 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Habits

- `GET /api/habits` - Get user's habits
- `POST /api/habits` - Create new habit
- `PATCH /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit (soft delete)
- `POST /api/habits/:habitId/entries` - Log habit completion
- `GET /api/habits/:habitId/entries` - Get habit entries

### Statistics

- `GET /api/stats/habit-streaks` - Get streak statistics
- `GET /api/stats/weekly` - Get weekly summaries

## 🚀 Usage

1. **Sign Up**: Create an account with email and password
2. **Create Habits**: Add habits you want to track (e.g., "Exercise daily")
3. **Log Progress**: Mark habits as completed each day
4. **View Stats**: Check your streaks and weekly progress
5. **Stay Motivated**: Build consistent habits over time!

## 🔒 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in localStorage
- Protected routes require `Authorization: Bearer <token>` header
- Tokens expire after 7 days

## 📱 Features in Detail

### Habit Creation

- Name, description, frequency, target count
- Category selection (fitness, health, productivity, etc.)
- Custom colors for visual organization

### Daily Tracking

- Mark habits as completed/uncompleted
- Add notes for each entry
- Track multiple completions per day
- View history by date range

### Statistics & Streaks

- Current streak counter
- All-time completion count
- Weekly progress summaries
- Visual progress indicators

## 🧪 Testing

### Manual Testing

1. Create a test user account
2. Add a few habits
3. Log completions for several days
4. Check streak calculations
5. Verify statistics endpoints

### API Testing

Use tools like Postman or curl to test endpoints:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set strong JWT secret
4. Use process manager like PM2

### Frontend Deployment

1. Build the production bundle: `npm run build`
2. Serve static files from `dist/` directory
3. Configure proxy for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Farid Berlin

---

**Happy habit tracking! 💪**
