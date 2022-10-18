const questionServices = require("../services/question.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createQuestion = catchAsync(async (req, res) => {
  const content = req.body.content;
  const newQuestion = await questionServices.createQuestion(content);
  return res.status(httpStatus.OK).json({
    message: "Create Successfully",
    data: newQuestion
  });
});

const getListQuestion = catchAsync(async (req, res) => {
  const questions = await questionServices.getListQuestion(req.query);
  return res.status(httpStatus.OK).json({
    message: "Successfully",
    data: {
        ...questions
    }
  });
});

const getQuestionById = catchAsync(async (req, res) => {
  const questionId = req.params.questionId;
  const question = await questionServices.getQuestionById(questionId);
  if (!question) {
    throw new Error("Not found");
  }
  return res.status(httpStatus.OK).json({
    message: "Successfully",
    data: question
  });
});

const updatedQuestion = catchAsync(async (req, res) => {
  const questionId = req.params.questionId;
  const body = req.body;
  const question = await questionServices.updateQuestionById( questionId, body );
  return res.status(httpStatus.OK).json({
    message: "Update successfully",
    data: question
  });
});

const deleteQuestion = catchAsync(async (req, res) => {
  const questionId = req.params.questionId;
  await questionServices.deleteQuestionById(questionId);
  return res.status(httpStatus.OK).json({ message: "Delete successfully" });
});

module.exports = {
  createQuestion,
  getListQuestion,
  getQuestionById,
  updatedQuestion,
  deleteQuestion
};
