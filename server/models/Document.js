const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['ID Proof', 'Address Proof', 'Educational', 'Experience Letter', 'Offer Letter', 'Contract', 'Policy', 'Other'],
    required: true
  },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiryDate: Date,
  status: { type: String, enum: ['Active', 'Expired', 'Archived'], default: 'Active' },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
