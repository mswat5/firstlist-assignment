const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  USER: 'user'
};

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_EXISTS: 'User already exists',
  SERVER_ERROR: 'Server error',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_ROLE: 'Invalid role assignment'
};

module.exports = {
  ROLES,
  ERROR_MESSAGES
};