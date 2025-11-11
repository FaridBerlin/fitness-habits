import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, timezone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ email, password, name, timezone: timezone || 'UTC' });
    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, email, name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
