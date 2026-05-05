const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: Number,
  year: Number,
  workingDays: Number,
  presentDays: Number,
  leaveDays: Number,
  earnings: {
    basic: Number, hra: Number, da: Number,
    specialAllowance: Number, bonus: Number, overtime: Number,
    gross: Number
  },
  deductions: {
    pf: Number, esi: Number,
    professionalTax: Number, tds: Number,
    loanDeduction: Number, other: Number,
    total: Number
  },
  netPay: Number,
  paymentStatus: { type: String, enum: ['Draft', 'Processed', 'Paid', 'Hold'], default: 'Draft' },
  paymentDate: Date,
  paymentMode: { type: String, enum: ['Bank Transfer', 'Cheque', 'Cash'] },
  payslipUrl: String,
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
