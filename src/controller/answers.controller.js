const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Answers = require('../models/answers.model');

const createAnswer = async (req, res) => {
    try {
        const answers = await Answers.create({
            question_id: req.body.question_id,
            content: req.body.content,
            isCorrect: req.body.isCorrect
        });
        return res.status(200).json({ message: "Successfully", data: answers});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const getAnswers = async (req,res) => {
    try {
        const answers = await Answers.findAll({
            limit: 10 
          });
          return res.status(200).json({ message: "Successfully", data: answers});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const getAnswerByQuestionId = async (req,res) => {
    try {
        const questionId = req.params.questionId
        const answers = await Answers.findOne({
            where: {
                question_id: questionId
            }
        });
        if(answers === null) {
            res.status(404).json({message: "Not found answers"});
        }
        return res.status(200).json({ message: "Successfully", data: answers});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}


const updatedAnswer = async (req,res) => {
    try {
        const answer = await Answers.findByPk(req.params.answersId);
        if (!answer) {
            throw new ApiError(httpStatus.NOT_FOUND, "Not found");
        }
        await question.update({
                question_id : req.body.question_id,
                content: req.body.content,
                isCorrect: req.body.isCorrect
            }, { 
                where: {
                    id: req.params.answersId
                }
            });
        return res.status(200).json({ message: "Successfully", data: answer}); 
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const deleteAnswer = async (req, res) => {
    try {
        const answer = await Answers.findByPk(req.params.answersId);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await answer.destroy({
        where: {
            id: req.params.answersId
        }
    });
        return res.status(200).json({message: "Successfully"});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

module.exports = { 
    createAnswer,
    getAnswers,
    getAnswerByQuestionId,
    updatedAnswer,
    deleteAnswer
} ;