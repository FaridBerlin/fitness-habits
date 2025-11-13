import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import statsRoutes from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow frontend to access backend
const allowedOrigins = [
  'http://localhost:3000',
  'https://fitness-habits-frontend.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/healthz', (req, res) => res.json({ ok: true }));

// Start server
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
})();
