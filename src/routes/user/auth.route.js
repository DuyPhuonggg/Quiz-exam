const express = require("express");
const authRouter = express.Router();
const authController = require('../../controller/auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

authRouter.post("/register",  authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh-token", authMiddleware.verifyRefreshToken);

module.exports = authRouter;