const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path if needed

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@1234';

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail, isAdmin: true });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return; // Exit if admin already exists
    }

    // Hash the admin password

    // const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create a new admin user
    const admin = new User({
      firstname: 'Admin',
      email: adminEmail,
      phone: '0000000000', // Placeholder phone number
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};

module.exports = seedAdmin; // Export the function
