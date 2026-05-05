const Document = require('../models/Document');

exports.getMyDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({ employee: req.user.employee }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
};

exports.uploadDocument = async (req, res, next) => {
  try {
    // Basic implementation. Multer/Cloudinary middleware should handle actual file upload.
    // Assuming file info is in req.file or req.body.url
    const document = await Document.create({
      ...req.body,
      employee: req.user.employee,
      uploadedBy: req.user.id
    });
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    next(error);
  }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.getAllDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find().populate('employee', 'firstName lastName avatar employeeId').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
};

exports.getPolicies = async (req, res, next) => {
  try {
    const policies = await Document.find({ type: 'Policy' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    next(error);
  }
};

exports.getExpiringDocuments = async (req, res, next) => {
  try {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const documents = await Document.find({ 
      expiryDate: { $lte: thirtyDaysFromNow, $gte: new Date() } 
    }).populate('employee', 'firstName lastName');
    
    res.status(200).json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
};
