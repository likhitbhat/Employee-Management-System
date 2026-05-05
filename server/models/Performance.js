const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  cycle: String,
  period: { from: Date, to: Date },
  kpis: [{
    name: String,
    target: Number,
    achieved: Number,
    score: Number,
    weightage: Number
  }],
  overallScore: Number,
  selfRating: Number,
  managerRating: Number,
  status: { type: String, enum: ['Draft', 'Self Review', 'Manager Review', 'Completed'] },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  comments: String
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);
