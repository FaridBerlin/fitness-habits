import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import statsRoutes from './routes/stats.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/stats', statsRoutes);

app.get('/healthz', (req, res) => res.json({ ok: true }));

export default app;
