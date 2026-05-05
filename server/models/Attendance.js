const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  clockIn: Date,
  clockOut: Date,
  hoursWorked: Number,
  status: { 
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Half-Day', 'WFH', 'Holiday', 'Weekend'] 
  },
  location: String,
  ipAddress: String,
  overrideBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  overrideReason: String
}, { timestamps: true });

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
