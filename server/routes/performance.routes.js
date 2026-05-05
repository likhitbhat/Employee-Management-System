const express = require('express');
const router = express.Router();
const {
  getCycles, createCycle, getMyPerformance, getTeamPerformance, getAllPerformance,
  createPerformance, updatePerformance, submitPerformance, getPerformance, submitFeedback,
  getMyGoals, createGoal, updateGoal
} = require('../controllers/performance.controller');

router.get('/cycles', getCycles);
router.post('/cycles', createCycle);
router.get('/my', getMyPerformance);
router.get('/team', getTeamPerformance);
router.get('/all', getAllPerformance);
router.post('/', createPerformance);
router.put('/:id', updatePerformance);
router.put('/:id/submit', submitPerformance);
router.get('/:id', getPerformance);
router.post('/feedback', submitFeedback);
router.get('/goals/my', getMyGoals);
router.post('/goals', createGoal);
router.put('/goals/:id', updateGoal);

module.exports = router;
