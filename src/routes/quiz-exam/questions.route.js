const express = require("express");
const questionsRouter = express.Router();
const questionsController = require("../../controller/questions.controller");
const validates = require("../../middlewares/validation.middleware");
const questionValidation = require("../../validations/question.validation");
const authMiddleware = require("../../middlewares/auth.middleware");

questionsRouter.post(
  "/add",
  authMiddleware.verifyAdmin,
  validates(questionValidation.createQuestion),
  questionsController.createQuestion
);

questionsRouter.get(
  "/",
  authMiddleware.verifyAccessToken,
  validates(questionValidation.getListQuestion),
  questionsController.getListQuestion
);

questionsRouter.get(
  "/:questionId",
  authMiddleware.verifyAccessToken,
  validates(questionValidation.getQuestion),
  questionsController.getQuestionById
);

questionsRouter.put(
  "/:questionId",
  authMiddleware.verifyAdmin,
  validates(questionValidation.updateQuestion),
  questionsController.updatedQuestion
);

questionsRouter.delete(
  "/:questionId",
  authMiddleware.verifyAdmin,
  validates(questionValidation.deleteQuestion),
  questionsController.deleteQuestion
);

module.exports = questionsRouter;
