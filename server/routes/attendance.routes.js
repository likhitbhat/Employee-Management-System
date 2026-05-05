const express = require('express');
const router = express.Router();
const {
  clockIn, clockOut, getToday, getMyAttendance, getTeamAttendance, getSummary, overrideAttendance
} = require('../controllers/attendance.controller');

router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.get('/today', getToday);
router.get('/my', getMyAttendance);
router.get('/team', getTeamAttendance);
router.get('/summary', getSummary);
router.put('/:id/override', overrideAttendance);

module.exports = router;
