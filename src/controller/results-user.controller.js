const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const ResultsUser = require('../models/results_user.model');

const getAllResultsUser = async(req,res) => {
    try {
        const resultsUser = await ResultsUser.findAll({
            limit: 10
        });
        return res.status(200).json({ message: "Successfully", data: resultsUser});
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

const getResultByUserId = async(req,res) => {
    try { 
        const userId = req.params.userId;
        const resultsUser = await ResultsUser.findAll({
            attributes: [
                'correct_answers',
                'no_answers',
                'score_id'
            ],
            where: {
                user_id: userId
            }
        });
        if (resultsUser) {
            res.status(404).json({ message: 'Not found', data: null});
        }
        return res.status(200).json({ data: resultsUser});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getResultByScoreId = async(res,req) => {
    try {
        const scoreId = req.params.scoreId;
        const resultsUser = await ResultsUser.findAll({
            attributes: [
                'user_id',
                'correct_answers',
                'no_answers',
            ],
            where: {
                user_id: scoreId
            }
        });
        if (resultsUser) {
            res.status(404).json({ message: 'Not found', data: null});
        }
        return res.status(200).json({ data: resultsUser});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const deleteResultbyId  = async(req,res) =>  {
    try {
        const  resultId  = req.params.resultId;
        const result = await ResultsUser.findByPk(resultId);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    await ResultsUser.destroy({
      where: {
        id: resultId
      }
    });
    return res.status(200).json({ message: "Successfully" });
     
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getAllResultsUser,
    getResultByScoreId,
    getResultByUserId,
    deleteResultbyId
}