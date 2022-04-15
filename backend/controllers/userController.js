const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @desc    login user
// @route   POST /api/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {});

// @desc    register user
// @route   POST /api/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {});

// @desc    logout user
// @route   GET /api/logout
// @access  Private
const logout = asyncHandler(async (req, res, next) => {});

module.exports = {
  login,
  register,
  logout,
};
