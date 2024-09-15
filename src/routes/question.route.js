const express = require("express");
const questionRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const validateMiddleware = require("../middlewares/validation.middleware");
const questionController = require("../controllers/question.controller");

questionRouter.use(authMiddleware.verifyToken);
questionRouter.use(authMiddleware.permission);
questionRouter.post("", validateMiddleware.createQuestion, questionController.createOne);
questionRouter.post("/bulk", validateMiddleware.createManyQuestion, questionController.bulkCreate);
questionRouter.get("/all", questionController.findAll);
questionRouter.get("/categories", questionController.getCategories);
questionRouter.get("/:id", questionController.findOne);
questionRouter.patch("/bulk", validateMiddleware.bulkUpdatedUser, questionController.bulkUpdate);
questionRouter.patch("/:id", validateMiddleware.createQuestion, questionController.updateOne);
questionRouter.delete("/bulk", validateMiddleware.bulkDeleteUser, questionController.bulkDelete);
questionRouter.delete("/:id", questionController.deleteOne);

module.exports = questionRouter;