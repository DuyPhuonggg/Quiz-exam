const Joi = require("joi");
const quizSchema = {
    name: Joi.string().min(1).required(),
    status: Joi.boolean().required(),
    images_url: Joi.string().optional().allow(null, ''),
    images_id: Joi.string().optional().allow(null, ''),
    timer_per_question: Joi.number().min(15).optional().allow(null, ''),
    question_ids: Joi.array().min(1).max(20).items(Joi.number()).required(),
};

const QuizSchema = {
    create: Joi.object()
        .keys({
            body: Joi.object({
                ...quizSchema
            })
        })
        .unknown(true),

    updated: Joi.object()
        .keys({
            body: Joi.object({
                ...quizSchema,
                name: Joi.string().min(1),
                status: Joi.boolean(),
                question_ids: Joi.array().min(1).max(20).items(Joi.number()),
            })
        })
        .unknown(true),
}

module.exports = QuizSchema;
