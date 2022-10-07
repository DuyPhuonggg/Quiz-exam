const express = require("express");
const answersRouter = express.Router();
const AnswersController = require('../../controller/answers.controller');

answersRouter.post("/post",AnswersController.createAnswer);
answersRouter.get("/", AnswersController.getAnswers);
answersRouter.get("/:questionId", AnswersController.getAnswerByQuestionId);
answersRouter.put("/:answersId", AnswersController.updatedAnswer);
answersRouter.delete("/:answersId", AnswersController.deleteAnswer);

module.exports = answersRouter;