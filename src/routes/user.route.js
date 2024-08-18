const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controller/user.controller");

userRouter.use(authMiddleware.verifyToken);
// userRouter.post("/login", userController.login)


module.exports = userRouter;