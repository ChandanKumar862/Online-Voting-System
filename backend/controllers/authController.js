import bcrypt from 'bcryptjs';
import store from '../db/store.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { name, fullName, email, password, role, voterId, state, constituency } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const userName = name || fullName;
    if (!userName) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.'
      });
    }

    const existingUser = await store.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const userRole = role || 'voter';

    const newUser = await store.createUser({
      name: userName,
      email,
      password_hash,
      role: userRole,
      voterId,
      state,
      constituency
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name || newUser.fullName
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = await store.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name || user.fullName
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access.'
      });
    }

    const user = await store.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
