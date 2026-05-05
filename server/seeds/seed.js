const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Department = require('../models/Department');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ems_db')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    const bcrypt = require('bcryptjs');
    const Employee = require('../models/Employee');

    // Clear existing
    await User.deleteMany();
    await Department.deleteMany();
    await Employee.deleteMany();
    
    console.log('Cleared existing data...');

    // Seed Departments
    const engineering = await Department.create({
      name: 'Engineering',
      description: 'Software Development and IT Operations',
      budget: 500000
    });

    const hr = await Department.create({
      name: 'Human Resources',
      description: 'Talent Acquisition and Management',
      budget: 150000
    });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Seed Admin User
    const adminUser = await User.create({
      email: 'admin@emspro.com',
      password: hashedPassword,
      role: 'super_admin',
    });

    const adminEmployee = await Employee.create({
      employeeId: 'EMP001',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@emspro.com',
      department: hr._id,
      designation: 'System Administrator',
      status: 'Active',
      joinDate: new Date(),
      user: adminUser._id
    });

    adminUser.employee = adminEmployee._id;
    await adminUser.save();

    // Seed Regular Employee
    const regularUser = await User.create({
      email: 'john@emspro.com',
      password: hashedPassword,
      role: 'employee',
    });

    const regularEmployee = await Employee.create({
      employeeId: 'EMP002',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@emspro.com',
      department: engineering._id,
      designation: 'Software Engineer',
      status: 'Active',
      joinDate: new Date(),
      user: regularUser._id
    });

    regularUser.employee = regularEmployee._id;
    await regularUser.save();

    console.log('Database seeded successfully!');
    console.log('Admin Email: admin@emspro.com | Password: password123');
    console.log('Employee Email: john@emspro.com | Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error with data seed', error);
    process.exit(1);
  }
};

seedData();
