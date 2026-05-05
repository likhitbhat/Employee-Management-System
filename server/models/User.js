const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'hr_manager', 'manager', 'employee'],
    default: 'employee'
  },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  refreshToken: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
