const AuthService = require("../services/authService");
const { ERROR_MESSAGES } = require("../config/constants");
const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: ERROR_MESSAGES.USER_EXISTS });
    }

    const user = await AuthService.createUser(
      { username, email, password, role },
      req.user?.id
    );

    const token = AuthService.generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const isValidPassword = await AuthService.validatePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const token = AuthService.generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
