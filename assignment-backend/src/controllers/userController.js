const UserService = require('../services/userService');
const AuthService = require('../services/authService');
const { ERROR_MESSAGES } = require('../config/constants');

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const creatorRole = req.user.role;

    const isValidRole = await UserService.validateRoleAssignment(creatorRole, role);
    if (!isValidRole) {
      return res.status(403).json({ message: ERROR_MESSAGES.INVALID_ROLE });
    }

    const user = await AuthService.createUser(
      { username, email, password, role },
      req.user.id
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = req.user.role === 'admin' 
      ? await UserService.getAllUsers()
      : await UserService.getUsersByCreator(req.user.id);
    
    res.json(users);
  } catch (error) {
    next(error);
  }
};