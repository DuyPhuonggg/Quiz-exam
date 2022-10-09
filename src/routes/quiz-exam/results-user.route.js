const express = require("express");
const resultsUserRouter = express.Router();
const resultsUserController = require('../../controller/results-user.controller')

resultsUserRouter.get("/", resultsUserController.getAllResultsUser);
resultsUserRouter.get("/:userId", resultsUserController.getResultByUserId);
resultsUserRouter.get("/:scoreId", resultsUserController.getResultByScoreId);
resultsUserRouter.delete("/:resultId", resultsUserController.deleteResultbyId);

module.exports = resultsUserRouter;