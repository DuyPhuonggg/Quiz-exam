const express = require("express");
const userRouter = express.Router();
const { userController } = require("../../controller/index");
const userValidation = require("../../validations/user.validation");
const validates = require("../../middlewares/validation.middleware");

userRouter.post(
  "/add",
  validates(userValidation.createUser),
  userController.createUser
);
userRouter.get(
  "/",
  validates(userValidation.getUsers),
  userController.findAllUser
);
userRouter.get(
  "/:userId",
  validates(userValidation.getUser),
  userController.findUserById
);
userRouter.put(
  "/:userId",
  validates(userValidation.updateUser),
  userController.updatedUser
);
userRouter.delete(
  "/:userId",
  validates(userValidation.deleteUser),
  userController.deleteUser
);

module.exports = userRouter;
