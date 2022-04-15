const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/userToken");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const _token = await Token.findOne({ token });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // check if token is invalid
      if (!_token) {
        res.status(400);
        throw new Error("Invalid token");
      }

      req.user = await User.findById(_token.user);

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Not authorized no token");
  }
});

module.exports = { protect };
