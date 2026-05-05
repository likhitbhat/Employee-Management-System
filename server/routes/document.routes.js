const express = require('express');
const router = express.Router();
const {
  getMyDocuments, uploadDocument, deleteDocument,
  getAllDocuments, getPolicies, getExpiringDocuments
} = require('../controllers/document.controller');

router.get('/my', getMyDocuments);
router.post('/upload', uploadDocument);
router.delete('/:id', deleteDocument);
router.get('/all', getAllDocuments);
router.get('/policies', getPolicies);
router.get('/expiring', getExpiringDocuments);

module.exports = router;
