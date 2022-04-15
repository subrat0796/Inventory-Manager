const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/userToken");

// @desc    login user
// @route   POST /api/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("In route");

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser && (await bcrypt.compare(password, existingUser.hash_password))) {
    const jwtToken = generateJWT(existingUser._id);
    // check if token already exist in token database , then refresh it
    const _token = await Token.findOne({ user: existingUser._id });
    const presentDate = new Date();
    const expiryDate = presentDate.setDate(presentDate.getDate() + 1);
    if (_token) {
      await Token.findOneAndUpdate({ user: existingUser._id }, { token: jwtToken, expiresIn: expiryDate });
    } else {
      const _token = await Token.create({
        user: existingUser._id,
        token: jwtToken,
        expiresIn: expiryDate,
      });
    }

    // sending the result
    res.status(201).json({
      status: "success",
      message: "user logged in",
      userdetails: existingUser,
      token: jwtToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    register user
// @route   POST /api/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  if (!name || !email || !username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const _user = await User.create({
    name,
    userName: username,
    email,
    hash_password: hashedPassword,
  });

  // if creation succesfull
  if (_user) {
    const jwtToken = generateJWT(_user._id);
    const presentDate = new Date();
    const expiryDate = presentDate.setDate(presentDate.getDate() + 1);
    const _token = await Token.create({
      user: _user._id,
      token: jwtToken,
      expiresIn: expiryDate,
    });

    res.status(201).json({
      status: "success",
      message: "user created",
      userdetails: _user,
      token: jwtToken,
    });
  } else {
    res.status(500);
    throw new Error("Some unknown error occured");
  }
});

// @desc    logout user
// @route   GET /api/logout
// @access  Private
const logout = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  await Token.findOneAndDelete({ user: userId });

  res.status(200).json({
    success: "true",
    message: "user logout success",
  });
});

// generate jwt
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  login,
  register,
  logout,
};
