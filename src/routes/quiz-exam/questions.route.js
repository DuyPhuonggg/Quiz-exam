const express = require("express");
const questionsRouter = express.Router();
const questionsController = require('../../controller/questions.controller');
const validates = require('../../middlewares/validation.middleware');
const questionValidation = require("../../validations/question.validation");

questionsRouter.post("/add",validates(questionValidation.createQuestion),questionsController.createQuestion);
questionsRouter.get("/",validates(questionValidation.getListQuestion), questionsController.getListQuestion);
questionsRouter.get("/:questionId",validates(questionValidation.getQuestion), questionsController.getQuestionById);
questionsRouter.put("/:questionId",validates(questionValidation.updateQuestion), questionsController.updatedQuestion);
questionsRouter.delete("/:questionId",validates(questionValidation.deleteQuestion), questionsController.deleteQuestion);

module.exports = questionsRouter;