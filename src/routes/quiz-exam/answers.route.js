const express = require("express");
const answersRouter = express.Router();

answersRouter.post("/add",AnswersController.createAnswers);
answersRouter.get("/", AnswersController.findAllAnswers);
answersRouter.get("/:answersId", AnswersController.findAnswersById);
answersRouter.put("/:answersId", AnswersController.updatedAnswers);
answersRouter.delete("/:answersId", AnswersController.deleteAnswers);

module.exports = answersRouter;