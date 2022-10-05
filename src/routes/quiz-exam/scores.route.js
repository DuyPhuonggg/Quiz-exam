const express = require("express");
const scoresRouter = express.Router();

scoresRouter.get("/", scoresController.findAllScore);
scoresRouter.get("/:scoreId", scoresController.findScoreById);
scoresRouter.delete("/:scoreId", scoresController.deleteScore);

module.exports = scoresRouter;
