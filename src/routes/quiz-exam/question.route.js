const express = require("express");
const questionRouter = express.Router();

questionRouter.post("/add",questionController.createQuestion);
questionRouter.get("/", questionController.findAllQuestion);
questionRouter.get("/:question", questionController.findQuestionById);
questionRouter.put("/:question", questionController.updatedQuestion);
questionRouter.delete("/:question", questionController.deleteQuestion);

module.exports = questionRouter;