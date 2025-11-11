import express from 'express';
import HabitEntry from '../models/HabitEntry.js';
import Habit from '../models/Habit.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// GET habit streak stats
router.get('/habit-streaks', verifyToken, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId, isActive: true });
    const streaks = [];

    for (const habit of habits) {
      const entries = await HabitEntry.find({ habitId: habit._id }).sort({ date: -1 });
      
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < entries.length; i++) {
        const entryDate = new Date(entries[i].date);
        entryDate.setHours(0, 0, 0, 0);
        
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);

        if (entryDate.getTime() === expectedDate.getTime() && entries[i].completed) {
          currentStreak++;
        } else {
          break;
        }
      }

      const allTimeStreak = entries.filter(e => e.completed).length;

      streaks.push({
        habitId: habit._id,
        habitName: habit.name,
        currentStreak,
        allTimeStreak,
        totalEntries: entries.length,
        completedEntries: entries.filter(e => e.completed).length,
      });
    }

    res.json(streaks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET weekly summary
router.get('/weekly', verifyToken, async (req, res) => {
  try {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const habits = await Habit.find({ userId: req.userId, isActive: true });
    const weekly = {};

    for (const habit of habits) {
      const entries = await HabitEntry.find({
        habitId: habit._id,
        date: { $gte: lastWeek, $lte: today },
      });

      weekly[habit._id] = {
        habitName: habit.name,
        completed: entries.filter(e => e.completed).length,
        total: entries.length,
      };
    }

    res.json(weekly);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
