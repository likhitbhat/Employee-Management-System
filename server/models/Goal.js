const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  title: String,
  description: String,
  dueDate: Date,
  progress: { type: Number, min: 0, max: 100 },
  status: { type: String, enum: ['Not Started', 'In Progress', 'On Track', 'At Risk', 'Completed', 'Missed'] },
  cycle: String
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
