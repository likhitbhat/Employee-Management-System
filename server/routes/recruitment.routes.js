const express = require('express');
const router = express.Router();
const {
  getJobs, createJob, updateJob, deleteJob, getCandidates,
  addCandidate, getCandidate, updateCandidate, deleteCandidate,
  getPipeline, updateStage
} = require('../controllers/recruitment.controller');

router.get('/jobs', getJobs);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);
router.get('/candidates', getCandidates);
router.post('/candidates', addCandidate);
router.get('/candidates/:id', getCandidate);
router.put('/candidates/:id', updateCandidate);
router.delete('/candidates/:id', deleteCandidate);
router.get('/pipeline', getPipeline);
router.put('/candidates/:id/stage', updateStage);

module.exports = router;
