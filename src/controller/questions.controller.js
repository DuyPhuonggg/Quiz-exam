const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Questions = require('../models/questions.model');

const createQuestion = async (req, res) => {
    try {
        const newQuestion = await Questions.create({
            result_id: req.body.result_id,
            content: req.body.content
        });
        return res.status(200).json({ message: "Successfully", data: newQuestion});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const getAllQuestion = async (req,res) => {
    try {
        const questions = await Questions.findAll({
            limit: 10 
          });
          return res.status(200).json({ message: "Successfully", data: questions});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const getQuestionById = async (req,res) => {
    try {
        const question = await Questions.findByPk(req.params.questionId);
        return res.status(200).json({ message: "Successfully", data: question});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const updatedQuestion = async (req,res) => {
    try {
        const question = await Questions.findByPk(req.params.questionId);
        if (!question) {
            throw new ApiError(httpStatus.NOT_FOUND, "Not found");
        }
        await question.update({
                result_id : req.body.result_id,
                content: req.body.content,
            }, { 
                where: {
                    id: req.params.questionId
                }
            });
        return res.status(200).json({ message: "Successfully", data: question}); 
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const question = await Questions.findByPk(req.params.questionId);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await Questions.destroy({
        where: {
            id: req.params.questionId
        }
    });
        return res.status(200).json({message: "Successfully"});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

module.exports = { 
    createQuestion,
    getAllQuestion,
    getQuestionById,
    updatedQuestion,
    deleteQuestion
} ;