const express = require("express");
const userRouter = express.Router();
const { userController } = require("../../controller/index");
const userValidation = require("../../validations/user.validation");
const validates = require("../../middlewares/validation.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const upload = require("../../utils/multer");

userRouter.post(
  "/add",
  authMiddleware.verifyAdmin,
  validates(userValidation.createUser),
  userController.createUser
);

userRouter.get(
  "/",
  authMiddleware.verifyAccessToken,
  validates(userValidation.getUsers),
  userController.findAllUser
);

userRouter.get(
  "/:userId",
  authMiddleware.verifyAccessToken,
  validates(userValidation.getUser),
  userController.findUserById
);

userRouter.patch(
  "/:userId",
  authMiddleware.verifyAccessToken,
  upload.single("image"),
  validates(userValidation.updateUser),
  userController.updatedUser
);

userRouter.delete(
  "/:userId",
  authMiddleware.verifyAdmin,
  validates(userValidation.deleteUser),
  userController.deleteUser
);

module.exports = userRouter;
