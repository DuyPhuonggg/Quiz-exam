const express = require("express");
const resultsUserRouter = express.Router();
const resultsUserController = require("../../controller/results-user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

resultsUserRouter.post(
  "/add",
  authMiddleware.verifyAccessToken,
  resultsUserController.createResult
);
resultsUserRouter.get(
  "/:userId",
  authMiddleware.verifyAccessToken,
  resultsUserController.getListResult
);

module.exports = resultsUserRouter;
