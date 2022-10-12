const express = require("express");
const answersRouter = express.Router();
const AnswersController = require('../../controller/answers.controller');
const validates = require('../../middlewares/validation.middleware');
const answerValidation = require("../../validations/answer.validation");

answersRouter.post("/add",validates(answerValidation.createAnswer),AnswersController.createAnswer);
answersRouter.put("/:answerId",validates(answerValidation.deleteAnswer), AnswersController.updatedAnswer);
answersRouter.delete("/:answerId",validates(answerValidation.deleteAnswer), AnswersController.deleteAnswer);

module.exports = answersRouter;