const questionServices = require("../services/question.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const response = require("../utils/responseTemp");

const createQuestion = catchAsync(async (req, res) => {
  const content = req.body.content;
  const newQuestion = await questionServices.createQuestion(content);
  res.send(response(httpStatus.OK, "Create Successfully", newQuestion));
});

const getListQuestion = catchAsync(async (req, res) => {
  const questions = await questionServices.getListQuestion(req.query);
  res.send(response(httpStatus.OK, "Successfully", questions));
});

const getQuestionById = catchAsync(async (req, res) => {
  const questionId = req.params.questionId;
  const question = await questionServices.getQuestionById(questionId);
  res.send(response(httpStatus.OK, "Successfully", question));
});

const updatedQuestion = catchAsync(async (req, res) => {
  const questionId = req.params.questionId;
  const body = req.body;
  const question = await questionServices.updateQuestionById(questionId, body);
  res.send(response(httpStatus.OK, "Update Successfully", question));
});

const deleteQuestion = catchAsync(async (req, res) => {
  const questionId = req.params.questionId;
  await questionServices.deleteQuestionById(questionId);
  res.send(response(httpStatus.OK, "Delete Successfully"));
});

module.exports = {
  createQuestion,
  getListQuestion,
  getQuestionById,
  updatedQuestion,
  deleteQuestion
};
