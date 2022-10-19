const httpStatus = require("http-status");
const Answers = require("../models/answers.model");
const ResultsUser = require("../models/results_user.model");
const { AnswersTypes } = require("../constant/enum");
const catchAsync = require("../utils/catchAsync");
const resultUserServices = require("../services/result-user.service");

const createResult = catchAsync(async (req, res) => {
  const result = await resultUserServices.createResult(req.body);
  return res.status(httpStatus.OK).json({
    message: "Submit successfully",
    data: result
  });
});

const getResult = catchAsync(async (req, res) => {
  const sessionId = req.params.sessionId;
  const { question_id, user_id } = req.query;
  const questionId = question_id ? question_id : null;
  const result = await resultUserServices.queryResult(sessionId, parseInt(user_id), questionId);
  return res.status(httpStatus.OK).json({
    message: "Successfully",
    content: { user_id: parseInt(user_id), session_id: parseInt(sessionId), data: result }
  });
});

module.exports = {
  createResult,
  getResult,
};
