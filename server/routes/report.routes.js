const express = require('express');
const router = express.Router();
const {
  getHeadcount, getAttendanceReport, getPayrollReport, getLeaveReport,
  getPerformanceReport, getAttritionReport, exportReport
} = require('../controllers/report.controller');

router.get('/headcount', getHeadcount);
router.get('/attendance', getAttendanceReport);
router.get('/payroll', getPayrollReport);
router.get('/leave', getLeaveReport);
router.get('/performance', getPerformanceReport);
router.get('/attrition', getAttritionReport);
router.get('/export/:type', exportReport);

module.exports = router;
