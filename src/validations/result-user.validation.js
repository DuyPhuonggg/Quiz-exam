const Joi = require("joi");

const createResult = Joi.object().keys({
    body: Joi.object().keys({
        user_id: Joi.number().integer().min(1).required(),
        session: Joi.number().integer().min(1).required(),
        content: Joi.array().items(
            Joi.object().keys({
                question: Joi.string().required(),
                answer: Joi.array().items(Joi.number().integer().min(1).required())
            })
        )
    })
}).unknown(true);

const queryResult = Joi.object().keys({
    query: Joi.object({
        user_id: Joi.number().integer(),
        question_id: Joi.any().optional(),
    })
}).unknown(true);

module.exports = {
    createResult,
    queryResult
}