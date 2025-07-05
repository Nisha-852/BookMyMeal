// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { validateUser, validate } = require('../validation/userValidation');
const { generatePassword,registerUser, getAllEmployees, login, changePassword, checkuserSession } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/register', validateUser, validate, registerUser);

router.get('/', verifyToken, getAllEmployees);

router.post('/login', login);

router.post('/admin/change-password', verifyToken, changePassword);

router.get('/check-user-session', verifyToken, checkuserSession)

module.exports = router;



