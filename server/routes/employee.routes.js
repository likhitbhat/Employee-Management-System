const express = require('express');
const { 
  getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeeStats,
  uploadAvatar, getEmployeeAttendance, getEmployeeLeaves, getEmployeePayslips, getEmployeePerformance
} = require('../controllers/employee.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);

router.get('/stats/summary', getEmployeeStats);
router.route('/')
  .get(getEmployees)
  .post(authorize('hr_manager', 'super_admin'), createEmployee);

router.route('/:id')
  .get(getEmployee)
  .put(authorize('hr_manager', 'super_admin'), updateEmployee)
  .delete(authorize('super_admin'), deleteEmployee);

router.post('/:id/avatar', uploadAvatar);
router.get('/:id/attendance', getEmployeeAttendance);
router.get('/:id/leaves', getEmployeeLeaves);
router.get('/:id/payslips', getEmployeePayslips);
router.get('/:id/performance', getEmployeePerformance);

module.exports = router;
