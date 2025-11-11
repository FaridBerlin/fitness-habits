import express from 'express';
import Habit from '../models/Habit.js';
import HabitEntry from '../models/HabitEntry.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// GET all habits for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId, isActive: true }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create habit
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description, frequency, target, category, color } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });

    const habit = new Habit({
      userId: req.userId,
      name,
      description,
      frequency: frequency || 'daily',
      target: target || 1,
      category: category || 'fitness',
      color: color || '#4CAF50',
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update habit
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const { name, description, frequency, target, category, color, isActive } = req.body;
    const updated = await Habit.findByIdAndUpdate(
      req.params.id,
      { name, description, frequency, target, category, color, isActive, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Habit not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE habit (soft delete)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Habit.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!deleted) return res.status(404).json({ error: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST log habit entry
router.post('/:habitId/entries', verifyToken, async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date, completed, count, notes } = req.body;

    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    // Check if entry for this date already exists
    const existingEntry = await HabitEntry.findOne({
      habitId,
      date: new Date(date).toDateString(),
    });

    if (existingEntry) {
      existingEntry.completed = completed !== undefined ? completed : existingEntry.completed;
      existingEntry.count = count !== undefined ? count : existingEntry.count;
      existingEntry.notes = notes || existingEntry.notes;
      await existingEntry.save();
      return res.json(existingEntry);
    }

    const entry = new HabitEntry({
      habitId,
      userId: req.userId,
      date: new Date(date),
      completed: completed !== undefined ? completed : true,
      count: count || 1,
      notes,
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET entries for a habit
router.get('/:habitId/entries', verifyToken, async (req, res) => {
  try {
    const { habitId } = req.params;
    const { startDate, endDate } = req.query;

    const filter = { habitId };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const entries = await HabitEntry.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
