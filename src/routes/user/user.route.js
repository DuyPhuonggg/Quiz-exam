const express = require("express");
const userRouter = express.Router();
const userController = require('../../controller/user.controller');

userRouter.get("/", userController.findAllUser);
userRouter.post("/add",userController.createUser);
userRouter.get("/:userId", userController.findUserById);
userRouter.put("/:userId", userController.updatedUser);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;