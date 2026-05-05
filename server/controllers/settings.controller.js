const AuditLog = require('../models/AuditLog');

// In a real application, settings might be stored in a Settings model or a JSON config file.
// Here we use dummy data.

exports.getCompanyProfile = async (req, res, next) => {
  try {
    const profile = { name: 'EMS Pro', email: 'contact@emspro.com', phone: '1234567890' };
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

exports.updateCompanyProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.body });
  } catch (error) {
    next(error);
  }
};

exports.getLeavePolicy = async (req, res, next) => {
  try {
    const policy = { casual: 12, sick: 10, earned: 20 };
    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    next(error);
  }
};

exports.updateLeavePolicy = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.body });
  } catch (error) {
    next(error);
  }
};

exports.getPayrollConfig = async (req, res, next) => {
  try {
    const config = { pfPercentage: 12, maxPf: 1800, pt: 200 };
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    next(error);
  }
};

exports.updatePayrollConfig = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.body });
  } catch (error) {
    next(error);
  }
};

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate('user', 'email').sort({ createdAt: -1 }).limit(100);
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};

exports.getPermissions = async (req, res, next) => {
  try {
    const permissions = { 
      super_admin: ['all'], 
      hr_manager: ['read_all', 'write_employees', 'write_payroll'],
      manager: ['read_team', 'write_team_performance', 'approve_leaves'],
      employee: ['read_self', 'write_self_leaves']
    };
    res.status(200).json({ success: true, data: permissions });
  } catch (error) {
    next(error);
  }
};

exports.updatePermissions = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.body });
  } catch (error) {
    next(error);
  }
};
