const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

exports.getPayrollRecords = async (req, res, next) => {
  try {
    const records = await Payroll.find().populate('employee', 'firstName lastName employeeId avatar').sort({ year: -1, month: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.runPayroll = async (req, res, next) => {
  try {
    const { employee, month, year } = req.body;
    
    const existing = await Payroll.findOne({ employee, month, year });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Payroll already run for this employee for the given month and year' });
    }

    const emp = await Employee.findById(employee);
    if (!emp) return res.status(404).json({ success: false, message: 'Employee not found' });

    // Dummy salary calculation
    const basic = emp.salary?.basic || 10000;
    const hra = basic * 0.4;
    const da = basic * 0.1;
    const specialAllowance = emp.salary?.specialAllowance || 2000;
    
    const gross = basic + hra + da + specialAllowance;
    
    const pf = Math.min(basic * 0.12, 1800);
    const professionalTax = 200;
    const deductionsTotal = pf + professionalTax;
    const netPay = gross - deductionsTotal;

    const payroll = await Payroll.create({
      employee,
      month,
      year,
      workingDays: 22,
      presentDays: 20,
      leaveDays: 2,
      earnings: { basic, hra, da, specialAllowance, gross },
      deductions: { pf, professionalTax, total: deductionsTotal },
      netPay,
      paymentStatus: 'Draft',
      processedBy: req.user.id
    });

    res.status(201).json({ success: true, data: payroll });
  } catch (error) {
    next(error);
  }
};

exports.getMyPayslips = async (req, res, next) => {
  try {
    const records = await Payroll.find({ employee: req.user.employee }).sort({ year: -1, month: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.getPayrollRecord = async (req, res, next) => {
  try {
    const record = await Payroll.findById(req.params.id).populate('employee');
    if (!record) return res.status(404).json({ success: false, message: 'Payroll record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const record = await Payroll.findByIdAndUpdate(req.params.id, {
      paymentStatus: req.body.status,
      paymentDate: req.body.status === 'Paid' ? new Date() : undefined,
      paymentMode: req.body.paymentMode
    }, { new: true });
    
    if (!record) return res.status(404).json({ success: false, message: 'Payroll record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.generatePayslip = async (req, res, next) => {
  try {
    // Generate PDF logic would go here. For now return a dummy URL.
    res.status(200).json({ success: true, url: 'https://dummy-payslip-url.com/payslip.pdf' });
  } catch (error) {
    next(error);
  }
};

exports.bulkProcess = async (req, res, next) => {
  try {
    // Basic stub for bulk processing
    res.status(200).json({ success: true, message: 'Bulk processing completed', processedCount: 0 });
  } catch (error) {
    next(error);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const filter = {};
    if (month) filter.month = month;
    if (year) filter.year = year;
    
    const records = await Payroll.find(filter);
    const totalPayout = records.reduce((sum, r) => sum + (r.netPay || 0), 0);
    const totalEmployees = records.length;
    
    res.status(200).json({ success: true, data: { totalPayout, totalEmployees } });
  } catch (error) {
    next(error);
  }
};

exports.exportReport = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, url: 'https://dummy-url.com/report.xlsx' });
  } catch (error) {
    next(error);
  }
};
