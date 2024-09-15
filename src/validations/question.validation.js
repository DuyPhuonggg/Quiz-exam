const Joi = require("joi");

const { CATEGORIES } = require("../constants/question.constant");
const answerSchema = {
    content: Joi.string().required(),
    images_url: Joi.string().allow(null, ''),
    images_id: Joi.string().allow(null, ''),
};
const categoriesCode = CATEGORIES.map((v) => v.code);
const questionSchema= {
    title: Joi.string().min(1).required(),
    categories: Joi.array().min(1).items(Joi.string().valid(...categoriesCode)).required(),
    images_url: Joi.string().optional().allow(null, ''),
    images_id: Joi.string().optional().allow(null, ''),
    correct_answers: Joi.array().min(1).max(3).items(Joi.object().keys(answerSchema)).required(),
    incorrect_answers: Joi.array().min(1).max(3).items(Joi.object().keys(answerSchema)).required()
};

const QuestionSchema = {
    createQuestion: Joi.object()
        .keys({
            body: Joi.object({
                ...questionSchema
            })
        })
        .unknown(true),

    bulkCreateQuestion: Joi.object()
        .keys({
            body: Joi.array().min(1).required().items(
                Joi.object().keys({
                    ...questionSchema
                })
            )
        })
        .unknown(true),
}

module.exports = QuestionSchema;
