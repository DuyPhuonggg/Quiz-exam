const express = require("express");
const authRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controller/auth.controller");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);


module.exports = authRouter;