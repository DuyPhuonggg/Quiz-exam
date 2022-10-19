const Joi = require("joi");

const createResult = Joi.object().keys({
    body: Joi.object().keys({
        user_id: Joi.number().integer().min(1).required(),
        session: Joi.number().integer().min(1).required(),
        result: Joi.array().items(
            Joi.object().keys({
                question: Joi.string().required(),
                answer: Joi.array().items(Joi.number().integer().min(1).required())
            })
        )
    })
}).unknown(true);

module.exports = {
    createResult
}