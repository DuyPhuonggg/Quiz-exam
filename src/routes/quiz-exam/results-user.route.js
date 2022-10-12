const express = require("express");
const resultsUserRouter = express.Router();
const resultsUserController = require('../../controller/results-user.controller')

resultsUserRouter.post("/add", resultsUserController.createResult);
resultsUserRouter.get("/:userId", resultsUserController.getListResult);



module.exports = resultsUserRouter;