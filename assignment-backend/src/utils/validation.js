const { body } = require('express-validator');

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const signupValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const createUserValidation = [
  ...signupValidation,
  body('role')
    .isIn(['admin', 'agent', 'user'])
    .withMessage('Invalid role specified')
];

module.exports = {
  loginValidation,
  signupValidation,
  createUserValidation
};