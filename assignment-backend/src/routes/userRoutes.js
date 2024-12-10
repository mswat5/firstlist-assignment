const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');
const { createUserValidation } = require('../utils/validation');
const validateRequest = require('../middleware/validateRequest');

router.post(
  '/', 
  auth, 
  authorize('admin', 'agent'), 
  createUserValidation,
  validateRequest,
  createUser
);

router.get('/', auth, authorize('admin', 'agent'), getUsers);

module.exports = router;