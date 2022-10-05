const express = require("express");
const resultsUserRouter = express.Router();

resultsUserRouter.get("/", resultsUserController.findAllresultsUser);
resultsUserRouter.get("/:userId", resultsUserController.findresultsUserById);
resultsUserRouter.delete("/:userId", resultsUserController.deleteresultsUser);

module.exports = resultsUserRouter;