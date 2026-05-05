const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

exports.applyLeave = async (req, res, next) => {
  try {
    const employeeId = req.user.employee;
    if (!employeeId) return res.status(400).json({ success: false, message: 'No linked employee profile' });

    const leave = await Leave.create({
      ...req.body,
      employee: employeeId,
      status: 'Pending'
    });

    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};

exports.getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ employee: req.user.employee }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

exports.getLeaveBalance = async (req, res, next) => {
  try {
    // For now, return a dummy balance. In a real app, this would query a LeaveBalance model
    const balance = {
      casual: { total: 12, used: 2, remaining: 10 },
      sick: { total: 10, used: 1, remaining: 9 },
      earned: { total: 20, used: 0, remaining: 20 }
    };
    res.status(200).json({ success: true, data: balance });
  } catch (error) {
    next(error);
  }
};

exports.getPendingLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ status: 'Pending' }).populate('employee', 'firstName lastName avatar employeeId').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

exports.getAllLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find().populate('employee', 'firstName lastName avatar employeeId').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

exports.approveLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, {
      status: 'Approved',
      approvedBy: req.user.id
    }, { new: true });
    
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });
    
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};

exports.rejectLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, {
      status: 'Rejected',
      approvedBy: req.user.id,
      rejectionReason: req.body.reason
    }, { new: true });

    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });

    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};

exports.cancelLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findOneAndUpdate(
      { _id: req.params.id, employee: req.user.employee, status: 'Pending' },
      { status: 'Cancelled' },
      { new: true }
    );

    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found or cannot be cancelled' });

    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    next(error);
  }
};

exports.getTeamCalendar = async (req, res, next) => {
  try {
    const leaves = await Leave.find({ status: 'Approved' }).populate('employee', 'firstName lastName avatar');
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};
