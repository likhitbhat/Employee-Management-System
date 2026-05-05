const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

exports.clockIn = async (req, res, next) => {
  try {
    const employeeId = req.user.employee;
    if (!employeeId) return res.status(400).json({ success: false, message: 'No linked employee profile' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({ employee: employeeId, date: today });
    if (attendance) {
      return res.status(400).json({ success: false, message: 'Already clocked in today' });
    }

    attendance = await Attendance.create({
      employee: employeeId,
      date: today,
      clockIn: new Date(),
      status: 'Present',
      location: req.body.location || 'Office',
      ipAddress: req.ip
    });

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

exports.clockOut = async (req, res, next) => {
  try {
    const employeeId = req.user.employee;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({ employee: employeeId, date: today });
    if (!attendance) {
      return res.status(400).json({ success: false, message: 'Not clocked in today' });
    }
    if (attendance.clockOut) {
      return res.status(400).json({ success: false, message: 'Already clocked out' });
    }

    attendance.clockOut = new Date();
    const hours = (attendance.clockOut - attendance.clockIn) / (1000 * 60 * 60);
    attendance.hoursWorked = Number(hours.toFixed(2));
    await attendance.save();

    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

exports.getToday = async (req, res, next) => {
  try {
    const employeeId = req.user.employee;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({ employee: employeeId, date: today });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

exports.getMyAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ employee: req.user.employee }).sort({ date: -1 });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

exports.getTeamAttendance = async (req, res, next) => {
  try {
    // Basic implementation: get all attendance if manager/HR
    const attendance = await Attendance.find().populate('employee', 'firstName lastName employeeId avatar').sort({ date: -1 });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const presentCount = await Attendance.countDocuments({ status: 'Present', date: { $gte: new Date(new Date().setHours(0,0,0,0)) } });
    res.status(200).json({ success: true, data: { presentCount } });
  } catch (error) {
    next(error);
  }
};

exports.overrideAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, {
      ...req.body,
      overrideBy: req.user.id
    }, { new: true });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};
