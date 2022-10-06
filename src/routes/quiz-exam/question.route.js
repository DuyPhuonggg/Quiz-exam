const express = require("express");
const questionRouter = express.Router();
const questionController = require('../../controller/question.controller');

questionRouter.post("/add",questionController.createQuestion);
questionRouter.get("/", questionController.getAllQuestion);
questionRouter.get("/:question", questionController.getQuestionById);
questionRouter.put("/:question", questionController.updatedQuestion);
questionRouter.delete("/:question", questionController.deleteQuestion);

module.exports = questionRouter;