const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const resultUserServices = require("../services/result-user.service");
const response = require("../utils/responseTemp");

const createResult = catchAsync(async (req, res) => {
  const result = await resultUserServices.createResult(req.body);
  res.send(response(httpStatus.OK,"Submit successfully",result));
});

const getResult = catchAsync(async (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.payload.aud ;
  const questionId = req.query.question_id ? req.query.question_id : null;
  const result = await resultUserServices.queryResult(sessionId, parseInt(userId), questionId);
  res.send(response(httpStatus.OK,"Successfully",result));
});

module.exports = {
  createResult,
  getResult,
};
