const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'firstname is required'],
    minlength: [3, 'firstname must be at least 3 characters'],
    unique: true,
  },
  lastname: {
    type: String,
    minlength: [3, 'lastname must be at least 3 characters'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number is invalid'],
  },
  rememberMe: {
    type: Boolean,
    default: false,
  },
  empId: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: [function () {
      return this.isAdmin; 
    }, 'Password is required for admin users'],
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
});

module.exports = mongoose.model('User', userSchema);
