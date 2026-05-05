const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  experience: Number,
  currentCTC: Number,
  expectedCTC: Number,
  resumeUrl: String,
  source: { type: String, enum: ['LinkedIn', 'Referral', 'Job Portal', 'Walk-in', 'Company Website'] },
  stage: { 
    type: String,
    enum: ['Applied', 'Screening', 'Interview', 'Technical', 'HR Round', 'Offer Sent', 'Hired', 'Rejected'],
    default: 'Applied'
  },
  rating: { type: Number, min: 1, max: 5 },
  notes: String,
  interviewDate: Date,
  offeredSalary: Number,
  rejectionReason: String
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
