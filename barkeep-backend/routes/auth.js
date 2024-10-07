const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

// Validation rules for user registration and login
const validateUserRegistration = [
  body('username')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Username is required and must be a non-empty string'),
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required'),
];

// Middleware to check for validation errors
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register a new user with validation
router.post('/register', validateUserRegistration, checkValidation, authController.register);

// Login a user and return a JWT token with validation
router.post('/login', validateUserLogin, checkValidation, authController.login);

module.exports = router;
