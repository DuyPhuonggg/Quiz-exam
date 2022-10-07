const express = require("express");
const questionsRouter = express.Router();
const questionsController = require('../../controller/questions.controller');

questionsRouter.post("/post",questionsController.createQuestion);
questionsRouter.get("/", questionsController.getAllQuestion);
questionsRouter.get("/:questionId", questionsController.getQuestionById);
questionsRouter.put("/:questionId", questionsController.updatedQuestion);
questionsRouter.delete("/:questionId", questionsController.deleteQuestion);

module.exports = questionsRouter;