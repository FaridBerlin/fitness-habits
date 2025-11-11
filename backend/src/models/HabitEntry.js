import { Schema, model } from 'mongoose';

const HabitEntrySchema = new Schema({
  habitId: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  count: { type: Number, default: 1 },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

HabitEntrySchema.index({ habitId: 1, date: 1 });
HabitEntrySchema.index({ userId: 1, date: -1 });

export default model('HabitEntry', HabitEntrySchema);
