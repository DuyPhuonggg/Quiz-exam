const Questions = require('../models/questions.model');
const Answers = require("../models/answers.model");
const pagination  = require("../utils/pagination");

const createQuestion = async (data) => {
    const question = await Questions.findAll({
        where: {
            content: data
        }
    })
    if(!question) {
        throw new Error("Question is already exist!");
    }
    const newQuestion = Questions.create({
        content: data
    });
    return newQuestion;
};

const getListQuestion = async (data) => {
    const { page, size } = data;
    const { limit, offset } = pagination.getPagination(parseInt(page), parseInt(size));
    const questions = await Questions.findAll({
        attributes: [
            'id',
            'content'
        ],
        offset: offset,
        limit: limit,
        include: {
            model: Answers,
            attributes: [
                'id',
                'content'
            ]
        }
    });
    console.log(questions,'111111');
    return questions;
};

const getQuestionById = async (id) => {
    const question = await Questions.findAndCountAll({
        attributes: ['content'],
        where: {
            id: id
        },
        include: {
            model: Answers,
            attributes: [
                'id',
                'content'
            ]
        }
    });
    if(!question) {
        throw new Error("Not found");
    }
    return question;
};

const updateQuestionById = async(questionId, body) => {
    const question = await Questions.findByPk(questionId);
    if(!question) {
        throw new Error("Not found");
    }
    return await question.update({
        content: body.content
    }, {
        where: {
            id: questionId
        }
    });
};

const deleteQuestionById = async (questionId) => {
    const question = await Questions.findByPk(questionId);
    if(!question) {
        throw new Error("Not found");
    }
    await question.destroy({
        where: {
            id:questionId
        }
    });
};

module.exports = {
    createQuestion,
    getListQuestion,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById
}