const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';


const generatePassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const registerUser =  async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;

  // Simple validation
  if (!firstname || !lastname || !email || !phone) {
    return res.status(400).json({ errors: [{ param: 'form', msg: 'All fields are required' }] });
  }

  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10); // Save this hashedPassword to DB if needed

  try {
    // Create a test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Email content
    const mailOptions = {
      from: '"Your App Name" <devon.price@ethereal.email>', // sender address
      to: 	'devon.price@ethereal.email',// recipient address
      subject: 'Welcome to Meal Service!',
      html: `
        <h1>Welcome, ${firstname} ${lastname}!</h1>
        <p>Thank you for registering with Rishabh's Meal App. Your account setup is complete</p>
        <p>Below are your login details:</p>
        <p><strong>Username:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> ${password}</p>
        <pTo start booking your meals, please click here to login.</p>
        <br/>
        <p><b>To start booking your meals, please <a href="">click here to login.</a></b></p>
        <p><b>Meal Facility Team</b></p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Respond with success
    res.status(200).json({
      message: 'Registration successful, email sent!',
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};


const getAllEmployees = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user || !user.isAdmin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '6h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      email: user.email,
      token,
      id: user._id,
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    console.log('dddd', user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('sdfdsfsdsd', 111)

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'You are not authorized to change the password' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    let newHashedPass = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ email }, { $set: { password: newHashedPass } })

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const checkuserSession = async (req, res) => {
  try {

    return res.status(200).json({ isVerified: true });
  } catch (error) {

  }
}

const registerAdmin = async (req, res) => {
  try {

  } catch (error) {
    console.log('registerAdmin>>', error)
  }
}

module.exports = { generatePassword,registerUser, getAllEmployees, login, changePassword, checkuserSession };
