const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SuperAdmin = require('../models/SuperAdmin');
const dotenv = require('dotenv');

dotenv.config();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define super admin credentials
const superAdminData = {
  fullName: 'Abrham Desalegn',
  username: 'AbrishDev',
  gender: 'male', // or 'female' or 'other'
  education: 'Software Engineering', // or relevant field
  password: 'Abrish1234', // Set your password
};

// Hash password
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(superAdminData.password, salt, async (err, hash) => {
    if (err) throw err;

    // Replace plain text password with hashed password
    superAdminData.password = hash;

    try {
      // Create super admin
      let superAdmin = await SuperAdmin.findOne({ username: superAdminData.username });

      if (superAdmin) {
        console.log('Super Admin already exists');
        mongoose.connection.close(); // Close connection
        return;
      }

      superAdmin = new SuperAdmin(superAdminData);

      await superAdmin.save();
      console.log('Super Admin created successfully');
      mongoose.connection.close(); // Close connection
    } catch (err) {
      console.error(err.message);
      mongoose.connection.close(); // Close connection on error
    }
  });
});
