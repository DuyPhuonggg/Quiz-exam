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

const getListResult = async (req, res) => {
  try {
    const results = await ResultsUser.findAll({
      order: [["question_id", "ASC"]],
      attributes: ["question_id", "user_choice"],
      where: {
        user_id: req.params.userId
      },
      include: {
        model: Answers,
        where: {
          is_correct: "true"
        },
        attributes: ["id", "content"]
      }
    });
    if (!results) {
      res.status(404).json({ message: "Not found", data: null });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Create successfully",
      data: results
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: err
    });
  }
};

const getResultBySessionId = async (res, req) => {
  try {
    const questionId = req.params.questionId;
    const result = await ResultsUser.findOne({
      where: { question_id: questionId },
      attributes: ["id", "user_id", "user_choice"],
      include: {
        model: Answers,
        attributes: ["id", "content"],
        where: { is_correct: AnswersTypes.TRUE }
      }
    });
    if (!result) throw new Error("Not Found Result");
    return res.status(httpStatus.Ok).json({
      message: "Successfully",
      data: result
    });
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: error
    });
  }
};
module.exports = {
  createResult,
  getListResult,
  getResultBySessionId
};
