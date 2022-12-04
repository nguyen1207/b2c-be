const express = require("express");
const authRouter = express.Router();

const catchAsync = require("../utils/catchAsync");
const authController = require("../controllers/auth.controller");

authRouter.post("/login", catchAsync(authController.login));
authRouter.post("/register", catchAsync(authController.register));

module.exports = authRouter;
