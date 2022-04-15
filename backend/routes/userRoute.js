const express = require("express");
const router = express.Router();

const { login, logout, register } = require("../controllers/userController");
const { protect } = require("../middlewares/authHandlerMiddleware");

router.post("/login", login);

router.post("/register", register);

router.get("/logout", protect, logout);

module.exports = router;
