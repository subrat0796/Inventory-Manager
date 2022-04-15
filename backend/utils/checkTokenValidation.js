const asyncHandler = require("express-async-handler");
const Token = require("../models/userToken");

const TokenValidation = asyncHandler(async () => {
  const _tokens = await Token.find({});
  let presentDate;
  let tokenExpiryDate;
  _tokens.map(async (_token) => {
    presentDate = new Date();
    presentDate = presentDate.setDate(presentDate.getDate());
    tokenExpiryDate = _token.expiresIn;

    if (presentDate >= tokenExpiryDate) {
      await Token.findByIdAndDelete(_token._id);
    }
  });
});

module.exports = TokenValidation;
