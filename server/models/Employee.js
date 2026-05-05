const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  avatar: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: String,
  nationality: String,
  address: {
    street: String, city: String,
    state: String, pincode: String, country: String
  },
  emergencyContact: {
    name: String, phone: String, relation: String
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  designation: String,
  reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  employmentType: { 
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Intern'] 
  },
  workLocation: { type: String, enum: ['Office', 'Remote', 'Hybrid'] },
  joinDate: Date,
  probationEndDate: Date,
  salary: {
    basic: Number,
    hra: Number,
    da: Number,
    specialAllowance: Number,
    gross: Number
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    accountHolderName: String
  },
  status: { type: String, enum: ['Active', 'Inactive', 'On Notice', 'Terminated'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
