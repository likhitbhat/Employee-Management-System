const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  location: String,
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Intern'] },
  experience: String,
  salary: { min: Number, max: Number },
  description: String,
  requirements: [String],
  openings: Number,
  status: { type: String, enum: ['Active', 'Closed', 'Draft', 'On Hold'] },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  closingDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
