const express = require("express");
const userRouter = express.Router();
const { userController } = require("../../controller/index");
const userValidation = require("../../validations/user.validation");
const validates = require("../../middlewares/validation.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");

userRouter.post(
  "/add",
  authMiddleware.verifyRole,
  validates(userValidation.createUser),
  userController.createUser
);
userRouter.get(
  "/",
  authMiddleware.verifyRole,
  validates(userValidation.getUsers),
  userController.findAllUser
);
userRouter.get(
  "/:userId",
  authMiddleware.verifyRole,
  validates(userValidation.getUser),
  userController.findUserById
);
userRouter.put(
  "/:userId",
  authMiddleware.verifyRole,
  validates(userValidation.updateUser),
  userController.updatedUser
);
userRouter.delete(
  "/:userId",
  authMiddleware.verifyRole,
  validates(userValidation.deleteUser),
  userController.deleteUser
);

module.exports = userRouter;
