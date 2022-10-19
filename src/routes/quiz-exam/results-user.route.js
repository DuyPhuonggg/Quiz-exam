const express = require("express");
const resultsUserRouter = express.Router();
const resultsUserController = require("../../controller/results-user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validates = require("../../middlewares/validation.middleware");
const resultUserValidate = require("../../validations/result-user.validation");

resultsUserRouter.post(
  "/add",
  authMiddleware.verifyAccessToken,
  validates(resultUserValidate.createResult),
  resultsUserController.createResult
);

resultsUserRouter.get(
  "/:sessionId",
  authMiddleware.verifyAccessToken,
  validates(resultUserValidate.queryResult),
  resultsUserController.getResult
);

module.exports = resultsUserRouter;
