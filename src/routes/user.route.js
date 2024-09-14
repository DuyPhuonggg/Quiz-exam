const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const validateMiddleware = require("../middlewares/validation.middleware");
const userController = require("../controllers/user.controller");

userRouter.use(authMiddleware.verifyToken);
userRouter.use(authMiddleware.permission);
userRouter.post("", validateMiddleware.createUser, userController.createOne);
userRouter.get("/all", userController.findAll);
userRouter.get("/:id", userController.findById);
userRouter.patch("/bulk", validateMiddleware.bulkUpdatedUser, userController.bulkUpdate);
userRouter.patch("/:id", validateMiddleware.updatedUser, userController.updatedOne);
userRouter.delete("/bulk", validateMiddleware.bulkDeleteUser, userController.bulkDelete);
userRouter.delete("/:id", userController.deleteOne);

module.exports = userRouter;