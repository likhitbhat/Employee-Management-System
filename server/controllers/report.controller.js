const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Payroll = require('../models/Payroll');
const Leave = require('../models/Leave');

exports.getHeadcount = async (req, res, next) => {
  try {
    const total = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: 'Active' });
    const inactive = total - active;
    
    // Group by department
    const byDepartment = await Employee.aggregate([
      { $match: { status: 'Active' } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
      { $unwind: { path: '$dept', preserveNullAndEmptyArrays: true } },
      { $project: { department: '$dept.name', count: 1, _id: 0 } }
    ]);

    res.status(200).json({ success: true, data: { total, active, inactive, byDepartment } });
  } catch (error) {
    next(error);
  }
};

exports.getAttendanceReport = async (req, res, next) => {
  try {
    const report = {
      overallAttendance: '85%',
      presentToday: 40,
      absentToday: 5,
      lateToday: 2
    };
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.getPayrollReport = async (req, res, next) => {
  try {
    const report = {
      totalPayout: 5000000,
      avgSalary: 100000,
      byDepartment: []
    };
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.getLeaveReport = async (req, res, next) => {
  try {
    const report = {
      totalLeavesTaken: 120,
      byType: { Sick: 40, Casual: 60, Earned: 20 }
    };
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.getPerformanceReport = async (req, res, next) => {
  try {
    const report = {
      topPerformers: [],
      needsImprovement: []
    };
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.getAttritionReport = async (req, res, next) => {
  try {
    const report = {
      attritionRate: '5%',
      leftThisYear: 10
    };
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

exports.exportReport = async (req, res, next) => {
  try {
    const { type } = req.params;
    res.status(200).json({ success: true, message: `Exporting ${type} report`, url: `https://dummy.com/export/${type}.xlsx` });
  } catch (error) {
    next(error);
  }
};
