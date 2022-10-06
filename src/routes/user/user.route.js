const express = require("express");
const userRouter = express.Router();
const { userController } = require('../../controller/index');

userRouter.post("/posts",userController.createUser);
userRouter.get("/", userController.findAllUser);
userRouter.get("/:userId", userController.findUserById);
userRouter.put("/:userId", userController.updatedUser);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;