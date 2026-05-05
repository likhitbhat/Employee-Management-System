const Performance = require('../models/Performance');
const Goal = require('../models/Goal');

exports.getCycles = async (req, res, next) => {
  try {
    // In a real app, this would be a distinct query or from a Cycle model
    const cycles = await Performance.distinct('cycle');
    res.status(200).json({ success: true, data: cycles });
  } catch (error) {
    next(error);
  }
};

exports.createCycle = async (req, res, next) => {
  try {
    res.status(201).json({ success: true, message: 'Cycle created successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getMyPerformance = async (req, res, next) => {
  try {
    const records = await Performance.find({ employee: req.user.employee }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.getTeamPerformance = async (req, res, next) => {
  try {
    const records = await Performance.find().populate('employee', 'firstName lastName avatar employeeId').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.getAllPerformance = async (req, res, next) => {
  try {
    const records = await Performance.find().populate('employee', 'firstName lastName avatar employeeId').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

exports.createPerformance = async (req, res, next) => {
  try {
    const record = await Performance.create({
      ...req.body,
      status: 'Draft'
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.updatePerformance = async (req, res, next) => {
  try {
    const record = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ success: false, message: 'Performance record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.submitPerformance = async (req, res, next) => {
  try {
    const record = await Performance.findByIdAndUpdate(req.params.id, { status: 'Manager Review' }, { new: true });
    if (!record) return res.status(404).json({ success: false, message: 'Performance record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.getPerformance = async (req, res, next) => {
  try {
    const record = await Performance.findById(req.params.id).populate('employee').populate('reviewedBy');
    if (!record) return res.status(404).json({ success: false, message: 'Performance record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.submitFeedback = async (req, res, next) => {
  try {
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getMyGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ employee: req.user.employee }).sort({ dueDate: 1 });
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    next(error);
  }
};

exports.createGoal = async (req, res, next) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      employee: req.user.employee
    });
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    next(error);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    next(error);
  }
};
