const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { loginValidation, signupValidation } = require('../utils/validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/signup', auth, signupValidation, validateRequest, signup);
router.post('/login', loginValidation, validateRequest, login);

module.exports = router;