const Joi = require("joi");

const registerSchema = Joi.object()
    .keys({
        body: Joi.object().keys({
            firstName: Joi.string().min(1).max(20),
            lastName: Joi.string().min(1).max(20),
            username: Joi.string().alphanum().min(3).max(50),
            password: Joi.string().min(6).required(),
            email: Joi.string().lowercase().email().min(5).max(50).required()
        })
    })
    .unknown(true);

const loginSchema = Joi.object()
    .keys({
        body: Joi.object().keys({
            email: Joi.string().lowercase().email().min(5).max(50).required(),
            password: Joi.string().min(1).required()
        })
    })
    .unknown(true);

const changePasswordSchema = Joi.object()
    .keys({
        body: Joi.object().keys({
            email: Joi.string().lowercase().email().min(5).max(50).required(),
            old_password: Joi.string().min(6).required(),
            new_password: Joi.string().min(6).required(),
        })
    })
    .unknown(true);

const resetPasswordSchema = Joi.object()
    .keys({
        body: Joi.object().keys({
            email: Joi.string().lowercase().email().min(5).max(50).required(),
            password: Joi.string().min(6).required(),
            code: Joi.string().min(6).required()
        })
    })
    .unknown(true);

const forgotPasswordSchema = Joi.object()
    .keys({
        body: Joi.object().keys({
            email: Joi.string().lowercase().email().min(5).max(50).required(),
        })
    })
    .unknown(true);

module.exports = {
    registerSchema,
    loginSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};
