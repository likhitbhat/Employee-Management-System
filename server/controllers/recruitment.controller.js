const Job = require('../models/Job');
const Candidate = require('../models/Candidate');

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('department');
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find().populate('job');
    res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    next(error);
  }
};

exports.addCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};

exports.getCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate('job');
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};

exports.updateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};

exports.deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.getPipeline = async (req, res, next) => {
  try {
    // Basic aggregation to get counts per stage
    const pipeline = await Candidate.aggregate([
      { $group: { _id: '$stage', count: { $sum: 1 } } }
    ]);
    res.status(200).json({ success: true, data: pipeline });
  } catch (error) {
    next(error);
  }
};

exports.updateStage = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { stage: req.body.stage }, { new: true });
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
};
