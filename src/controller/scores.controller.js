const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Scores = require('../models/scores.model');

const createScore = async(req,res) => {
    try {
        const {
            resultUser,
            questions,
            answer,
            noAnswer,
            incorrect,
            correct
        } = req.body;

        if(((questions-noAnswer) != answer) || (answer != noAnswer + incorrect + correct)) {
            return res.status(405).json({ message: 'Method not allowed' });
        }
        const score = await Scores.create({
            result_user: resultUser,
            total_question: questions,
            total_answer: answer,
            total_no_answer: noAnswer,
            total_incorrect_answers: incorrect,
            total_correct_answers: correct,
            score: correct/questions
        });
        return res.status(200).json({ message: "Successfully", data: score});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


const getScores = async (req,res) => {
    try {
        const scores = await Scores.findAll();
          return res.status(200).json({ data: scores });
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const getScoresByResultUserId = async (req,res) => {
    try {
        const ResultUserId = req.params.ResultUserId
        const scores = await Scores.findAll({
            attributes: [
                'total_question',
                'total_answer',
                'total_no_answer',
                'total_incorrect_answers',
                'total_correct_answers',
                'score'
            ],
            where: {
                result_user: ResultUserId
            }
        });
        if(scores) {
            res.status(404).json({message: "Not found scores"});
        }
        return res.status(200).json({ data: { question : ResultUserId, scores } });
    } catch (err) {
        return res.status(500).json({message: err});
    }
}


const updatedScoreById = async (req,res) => {
    try {
        const {
            resultUser,
            questions,
            answer,
            noAnswer,
            incorrect,
            correct
        } = req.body;

        if(((questions-noAnswer) != answer) || (answer != noAnswer + incorrect + correct)) {
            return res.status(405).json({ message: 'Method not allowed' });
        }
        const scoreId = req.params.scoreId;
        const score = await Scores.findByPk(scoreId);
        if (!answer) {
            throw new ApiError(httpStatus.NOT_FOUND, "Not found");
        }
        await Scores.update({
                result_user : resultUser,
                total_question: questions,
                total_answer: answer,
                total_no_answer: noAnswer,
                total_incorrect_answers: incorrect,
                total_correct_answers: correct,
                score: correct/questions
            }, { 
                where: {
                    id: scoreId
                }
            });
        return res.status(200).json({ message: "Successfully", data: score}); 
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const deleteScoreById = async (req, res) => {
    try {
        const scoreId = req.params.scoreId;
        const score = await Scores.findByPk(scoreId);
    if (!score) {
        throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await Scores.destroy({
        where: {
            id: scoreId
        }
    });
        return res.status(200).json({message: "Successfully"});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

module.exports = { 
    createScore,
    getScores,
    getScoresByResultUserId,
    updatedScoreById,
    deleteScoreById
};