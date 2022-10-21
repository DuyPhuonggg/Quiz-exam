const answerServices = require("../services/answer.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const response = require("../utils/responseTemp");

const createAnswer = catchAsync(async (req, res) => {
  const answer = await answerServices.createAnswer(req.body);
  res.send(response(httpStatus.OK,"Successfully",answer));
});

const updatedAnswer = catchAsync(async (req, res) => {
  const answer = await answerServices.updateAnswer( req.params.answerId, req.body );
  res.send(response(httpStatus.OK,"Update Successfully",answer));
});

const deleteAnswer = catchAsync(async (req, res) => {
  await answerServices.deleteAnswer(req.params.answerId);
  res.send(response(httpStatus.OK,"Delete successfully"));
});

module.exports = {
  createAnswer,
  updatedAnswer,
  deleteAnswer
};
