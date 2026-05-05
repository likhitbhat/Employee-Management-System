const express = require('express');
const { getDepartments, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getDepartments)
  .post(authorize('super_admin'), createDepartment);

router.route('/:id')
  .put(authorize('super_admin'), updateDepartment)
  .delete(authorize('super_admin'), deleteDepartment);

module.exports = router;
