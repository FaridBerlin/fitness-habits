import { Schema, model } from 'mongoose';

const HabitSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  frequency: { 
    type: String, 
    enum: ['daily', 'weekly', 'custom'], 
    default: 'daily' 
  },
  target: { type: Number, default: 1 }, // target count per frequency
  category: { 
    type: String, 
    enum: ['fitness', 'health', 'productivity', 'learning', 'other'],
    default: 'fitness'
  },
  color: { type: String, default: '#4CAF50' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

HabitSchema.index({ userId: 1, isActive: 1 });

export default model('Habit', HabitSchema);
