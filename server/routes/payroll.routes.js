const express = require('express');
const router = express.Router();
const {
  getPayrollRecords, runPayroll, getMyPayslips, getPayrollRecord,
  updatePaymentStatus, generatePayslip, bulkProcess, getSummary, exportReport
} = require('../controllers/payroll.controller');

router.get('/', getPayrollRecords);
router.post('/run', runPayroll);
router.get('/my', getMyPayslips);
router.get('/:id', getPayrollRecord);
router.put('/:id/status', updatePaymentStatus);
router.get('/:id/payslip', generatePayslip);
router.post('/bulk-process', bulkProcess);
router.get('/summary', getSummary);
router.get('/export', exportReport);

module.exports = router;
