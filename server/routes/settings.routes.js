const express = require('express');
const router = express.Router();
const {
  getCompanyProfile, updateCompanyProfile, getLeavePolicy, updateLeavePolicy,
  getPayrollConfig, updatePayrollConfig, getAuditLogs, getPermissions, updatePermissions
} = require('../controllers/settings.controller');

router.get('/company', getCompanyProfile);
router.put('/company', updateCompanyProfile);
router.get('/leave-policy', getLeavePolicy);
router.put('/leave-policy', updateLeavePolicy);
router.get('/payroll-config', getPayrollConfig);
router.put('/payroll-config', updatePayrollConfig);
router.get('/audit-logs', getAuditLogs);
router.get('/permissions', getPermissions);
router.put('/permissions', updatePermissions);

module.exports = router;
