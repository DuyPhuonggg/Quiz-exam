const ApiError = require('../utils/ApiError');
const questionServices = require("../services/question.service");

const createQuestion = async (req, res) => {
    try {
        const content = req.body.content;
        const newQuestion = await questionServices.createQuestion(content);
        return res.status(200).json({ 
            statusCode: 200,
            message: "Successfully", 
            data: newQuestion
        });
    } catch (err) {
        return res.status(400).json({
            statusCode:400,
            message: err
        });
    }
}

const getListQuestion = async (req,res) => {
    try {
        const questions = await questionServices.getListQuestion(req.query);
        return res.status(200).json({ 
            statusCode: 200,
            message: "Successfully", 
            data: questions 
          });
    } catch (err) {
        return res.status(500).json({ 
            statusCode: 500,
            message: err
          });
    }
};

const getQuestionById = async (req,res) => {
    try {
        const question = await questionServices.getQuestionById(req.params.questionId);
        if(!question) {
            throw new ApiError(httpStatus.NOT_FOUND, "Not found");
        }
        return res.status(200).json({ 
            statusCode: 200,
            message: "Successfully", 
            data: question 
          });
    } catch (err) {
        return res.status(500).json({ 
            statusCode: 500,
            message: err
          });
    }
}

const updatedQuestion = async (req,res) => {
    try {
        const question = await questionServices.updateQuestionById(req.params.questionId,req.body);
        return res.status(200).json({ 
            statusCode: 200,
            message: "Update successfully", 
            data: question 
          });
    } catch (err) {
        return res.status(500).json({ 
            statusCode: 500,
             message: err
          });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        await questionServices.deleteQuestionById(req.params.questionId);
        return res.status(200).json({ 
            statusCode:200,
            message: "Delete successfully"
           });
    } catch (err) {
        return res.status(500).json({ 
            statusCode:500,
            message: err 
          });
    }
}

module.exports = { 
    createQuestion,
    getListQuestion,
    getQuestionById,
    updatedQuestion,
    deleteQuestion
} ;