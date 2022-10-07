const express = require("express");
const authRouter = express.Router();
const authController = require('../../controller/auth.controller');
// const { verifyAccessToken } = require('../../configs/jwt');

authRouter.post("/register",  authController.register);
authRouter.post("/login",  authController.login);
authRouter.post("/logout", authController.logout);
// authRouter.post("/refresh-token", authController.refreshToken);

module.exports = authRouter;