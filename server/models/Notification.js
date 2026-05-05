const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  message: String,
  type: { type: String, enum: ['leave', 'payroll', 'performance', 'document', 'recruitment', 'system'] },
  isRead: { type: Boolean, default: false },
  link: String
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
