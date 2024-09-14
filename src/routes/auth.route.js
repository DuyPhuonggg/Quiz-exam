const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/auth.middleware");
const validateMiddleware = require("../middlewares/validation.middleware");

authRouter.post("/access-token", authController.getAccessToken);
authRouter.post("/register", validateMiddleware.register, authController.register);
authRouter.post("/login", validateMiddleware.login, authController.login);
authRouter.post("/forgot-password", validateMiddleware.forgotPassword, authController.forgotPassword);
authRouter.post("/reset-password", validateMiddleware.resetPassword, authController.resetPassword);

authRouter.use(authMiddlewares.verifyToken)
authRouter.post("/change-password", validateMiddleware.changePassword, authController.changePassword);
authRouter.get("/permissions", authController.findAllPermissions);
authRouter.get("/profile", authController.profile);

module.exports = authRouter;