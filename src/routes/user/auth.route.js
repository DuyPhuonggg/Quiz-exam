const express = require("express");
const authRouter = express.Router();
const authController = require("../../controller/auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const authValidation = require("../../validations/auth.validation");
const validates = require("../../middlewares/validation.middleware");

authRouter.post(
  "/register",
  validates(authValidation.register),
  authController.register
);

authRouter.post(
  "/login",
  validates(authValidation.login),
  authController.login
);

authRouter.delete(
  "/logout/:id",
  authMiddleware.verifyAccessToken,
  validates(authValidation.logout),
  authController.logout
);

authRouter.post(
  "/refresh-token",
  validates(authValidation.refreshToken),
  authController.refreshToken
);

module.exports = authRouter;
