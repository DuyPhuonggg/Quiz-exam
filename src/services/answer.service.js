const Answers = require("../models/answers.model");
const ApiError = require('../utils/ApiError');
const httpStatus = require("http-status");

const createAnswer = async(data) => {
    const answer = await Answers.create({
        question_id: data.question_id,
        content: data.content,
        is_correct: data.is_correct
    });
    return answer;
};

const updateAnswer = async(answerId, body) => {
    const answer = await Answers.findByPk(answerId);
    if(!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    return await answer.update({
        question_id: body.question_id,
        content: body.content,
        is_correct: body.is_correct
    }, {
        where: {
            id: answerId
        }
    });
};

const deleteAnswer = async (answerId) => {
    const answer = await Answers.findByPk(answerId);
    if(!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await answer.destroy({
        where: {
            id:answerId
        }
    });
};

module.exports = {
    createAnswer,
    updateAnswer,
    deleteAnswer
}