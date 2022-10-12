const Answers = require('../models/answers.model');
const ResultsUser = require('../models/results_user.model');

const createResult = async(req,res) => {
    try {
        const newResult = await ResultsUser.create({
            user_id: req.body.user_id,
            question_id: req.body.question_id,
            user_choice: req.body.user_choice,
        });
        return res.status(200).json({ 
            statusCode: 200,
            message: "Create successfully",
            data: newResult 
          });
    } catch (err) {
        return res.status(500).json({ 
            statusCode: 500,
            message: err
          });
    }
}

const getListResult = async(req,res) => {
    try { 
        const results = await ResultsUser.findAll({
            order: [
                ['question_id','ASC']
            ],
            attributes: [
                'question_id',
                'user_choice'
            ],
            where: {
                user_id: req.params.userId
            },
            include: {
                model: Answers,
                where: {
                    is_correct: true
                },
                attributes: [
                    'id',
                    'content'
                ]
            }
        });
        // if (!results) {
        //     res.status(404).json({ message: 'Not found', data: null});
        // }
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
}


module.exports = {
    createResult,
    getListResult
}