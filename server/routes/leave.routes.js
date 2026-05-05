const express = require('express');
const router = express.Router();
const {
  applyLeave, getMyLeaves, getLeaveBalance, getPendingLeaves, getAllLeaves,
  approveLeave, rejectLeave, cancelLeave, getTeamCalendar
} = require('../controllers/leave.controller');

router.post('/apply', applyLeave);
router.get('/my', getMyLeaves);
router.get('/balance', getLeaveBalance);
router.get('/pending', getPendingLeaves);
router.get('/all', getAllLeaves);
router.put('/:id/approve', approveLeave);
router.put('/:id/reject', rejectLeave);
router.put('/:id/cancel', cancelLeave);
router.get('/team-calendar', getTeamCalendar);

module.exports = router;
