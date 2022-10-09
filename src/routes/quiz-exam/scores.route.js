const express = require("express");
const scoresRouter = express.Router();
const scoresController = require('../../controller/scores.controller');

scoresRouter.post("/post", scoresController.createScore);
scoresRouter.get("/", scoresController.getScores);
scoresRouter.get("/:ResultUserId", scoresController.getScoresByResultUserId);
scoresRouter.put('/:scoreId', scoresController.updatedScoreById);
scoresRouter.delete("/:scoreId", scoresController.deleteScoreById);

module.exports = scoresRouter;
