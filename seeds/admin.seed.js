(async () => {
    try {
        console.log('Starting Admin User Creation...');
        require('dotenv').config();
        require('../config/db.config');
        const bcrypt = require('bcryptjs');
        const userModel = require('../models/User');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@meal.com';
        const adminPassword = process.env.ADMIN_PASSWORD || '123456';

        console.log('Generating Salt and Encrypting Password...');
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(adminPassword, salt);  // Only hash once

        console.log('Creating Admin User...');
        const adminUser = new userModel({
            firstname: 'admin',
            email: adminEmail,
            phone: '0000000000',
            password,
            // token,
            isAdmin: true,
        });

        await adminUser.save();  // Save the new admin user to the database
        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error creating admin user:', err);
    } finally {
        process.exit();  // Ensure the process exits after the task is completed
    }
})();
