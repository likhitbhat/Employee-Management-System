const Employee = require('../models/Employee');
const User = require('../models/User');

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().populate('department', 'name code').populate('user', 'email role isActive');
    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    next(error);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('department').populate('reportingManager');
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    employee.status = 'Inactive';
    await employee.save();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeStats = async (req, res, next) => {
  try {
    const total = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: 'Active' });
    res.status(200).json({
      success: true,
      data: { total, active }
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    // Basic implementation for avatar upload
    // In real app, Multer + Cloudinary logic handles the file
    const employee = await Employee.findByIdAndUpdate(req.params.id, {
      avatar: req.body.url || 'https://dummy-avatar-url.com/avatar.png'
    }, { new: true });
    
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeAttendance = async (req, res, next) => {
  try {
    const Attendance = require('../models/Attendance');
    const records = await Attendance.find({ employee: req.params.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeLeaves = async (req, res, next) => {
  try {
    const Leave = require('../models/Leave');
    const records = await Leave.find({ employee: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeePayslips = async (req, res, next) => {
  try {
    const Payroll = require('../models/Payroll');
    const records = await Payroll.find({ employee: req.params.id }).sort({ year: -1, month: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeePerformance = async (req, res, next) => {
  try {
    const Performance = require('../models/Performance');
    const records = await Performance.find({ employee: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};
