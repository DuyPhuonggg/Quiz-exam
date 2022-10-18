const answerServices = require("../services/answer.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createAnswer = catchAsync(async (req, res) => {
  const answer = await answerServices.createAnswer(req.body);
  return res.status(httpStatus.OK).json({
    message: "Successfully",
    data: answer
  });
});

const updatedAnswer = catchAsync(async (req, res) => {
  const answer = await answerServices.updateAnswer( req.params.answerId, req.body );
  return res.status(httpStatus.OK).json({
    message: "Update successfully",
    data: answer
  });
});

const deleteAnswer = catchAsync(async (req, res) => {
  await answerServices.deleteAnswer(req.params.answerId);
  return res.status(httpStatus.OK).json({
    message: "Delete successfully"
  });
});

module.exports = {
  createAnswer,
  updatedAnswer,
  deleteAnswer
};
