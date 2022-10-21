const express = require("express");
const answersRouter = express.Router();
const AnswersController = require("../../controller/answers.controller");
const validates = require("../../middlewares/validation.middleware");
const answerValidation = require("../../validations/answer.validation");
const authMiddleware = require("../../middlewares/auth.middleware");

answersRouter.post(
  "/add",
  authMiddleware.verifyAdmin,
  validates(answerValidation.createAnswer),
  AnswersController.createAnswer
);

answersRouter.patch(
  "/:answerId",
  authMiddleware.verifyAdmin,
  validates(answerValidation.updateAnswer),
  AnswersController.updatedAnswer
);

answersRouter.delete(
  "/:answerId",
  authMiddleware.verifyAdmin,
  validates(answerValidation.deleteAnswer),
  AnswersController.deleteAnswer
);

module.exports = answersRouter;
