const User = require('../models/User');
const { ROLES, ERROR_MESSAGES } = require('../config/constants');

class UserService {
  static async validateRoleAssignment(creatorRole, assignedRole) {
    if (creatorRole === ROLES.USER) return false;
    if (creatorRole === ROLES.AGENT && assignedRole !== ROLES.USER) return false;
    if (creatorRole === ROLES.ADMIN && ![ROLES.AGENT, ROLES.USER].includes(assignedRole)) return false;
    return true;
  }

  static async getAllUsers() {
    return User.find()
      .select('-password')
      .populate('createdBy', 'username email role');
  }

  static async getUsersByCreator(creatorId) {
    return User.find({ createdBy: creatorId })
      .select('-password')
      .populate('createdBy', 'username email role');
  }
}

module.exports = UserService;