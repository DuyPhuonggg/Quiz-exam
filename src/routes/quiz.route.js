const express = require("express");
const quizExamRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const validateMiddleware = require("../middlewares/validation.middleware");
const quizController = require("../controllers/quiz-exam.controller");

quizExamRouter.use(authMiddleware.verifyToken);
quizExamRouter.use(authMiddleware.permission);

quizExamRouter.post("", validateMiddleware.createQuiz, quizController.createOne);
quizExamRouter.get("/all", quizController.findAll);
quizExamRouter.get("/:id", quizController.findOne);
quizExamRouter.patch("/:id", validateMiddleware.updateQuiz, quizController.updateOne);
quizExamRouter.delete("/bulk", validateMiddleware.bulkDeleteById, quizController.bulkDelete);
quizExamRouter.delete("/:id", quizController.deleteOne);

module.exports = quizExamRouter;