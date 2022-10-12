const answerServices = require("../services/answer.service");

const createAnswer = async (req, res) => {
    try {
        const answer = await answerServices.createAnswer(req.body);
        return res.status(200).json({ 
            statusCode: 200,
            message: "Successfully", 
            data: answer
        });
    } catch (err) {
        return res.status(400).json({
            statusCode:400,
            message: err
        });
    }
}


const updatedAnswer = async (req,res) => {
    try {
        const answer = await answerServices.updateAnswer(req.params.answerId,req.body);
        return res.status(200).json({ 
            statusCode: 200,
            message: "Update successfully", 
            data: answer 
          });
    } catch (err) {
        return res.status(500).json({ 
            statusCode: 500,
             message: err
          });
    }
}

const deleteAnswer = async (req, res) => {
    try {
        const answer = await answerServices.deleteAnswer(req.params.answersId);
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
    createAnswer,
    updatedAnswer,
    deleteAnswer
};