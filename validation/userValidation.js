// validation/userValidation.js
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('firstname')
    .isLength({ min: 3 })
    .withMessage('firstname must be at least 3 characters'),
    body('lastname')
    .isLength({ min: 3 })
    .withMessage('last must be at least 3 characters'),
  body('email')
    .isEmail()
    .withMessage('Email is invalid'),
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, validate };
