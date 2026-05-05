const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true 
}));
// Temporarily disabled due to Express 5 compatibility issue with req.query getter
// app.use(mongoSanitize());
// Temporarily disabled for development/testing
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
const connectDB = require('./config/db');
connectDB();

// Routes
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const departmentRoutes = require('./routes/department.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const leaveRoutes = require('./routes/leave.routes');
const payrollRoutes = require('./routes/payroll.routes');
const performanceRoutes = require('./routes/performance.routes');
const recruitmentRoutes = require('./routes/recruitment.routes');
const documentRoutes = require('./routes/document.routes');
const notificationRoutes = require('./routes/notification.routes');
const reportRoutes = require('./routes/report.routes');
const settingsRoutes = require('./routes/settings.routes');
const { protect } = require('./middleware/auth.middleware');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/attendance', protect, attendanceRoutes);
app.use('/api/v1/leaves', protect, leaveRoutes);
app.use('/api/v1/payroll', protect, payrollRoutes);
app.use('/api/v1/performance', protect, performanceRoutes);
app.use('/api/v1/recruitment', protect, recruitmentRoutes);
app.use('/api/v1/documents', protect, documentRoutes);
app.use('/api/v1/notifications', protect, notificationRoutes);
app.use('/api/v1/reports', protect, reportRoutes);
app.use('/api/v1/settings', protect, settingsRoutes);

const errorMiddleware = require('./middleware/error.middleware');
// Global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
