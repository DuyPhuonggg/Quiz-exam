const Joi = require("joi");
const {ROLE, GENDER} = require("../constants/user.constant");

const commonBody = {
    email: Joi.string().lowercase().email().min(5).max(50).required(),
    password: Joi.string().min(6).required(),
};
const updatedUserBody = {
    first_name: Joi.string().min(1).max(20),
    last_name: Joi.string().min(1).max(20),
    username: Joi.string().alphanum().min(3).max(50),
    role: Joi.string().valid(ROLE.ADMIN, ROLE.USER, ROLE.NONE),
    gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE, GENDER.UNKNOWN),
    address: Joi.string(),
    phone_number: Joi.string(),
    permissionsId: Joi.array()
};

const AuthSchema = {
    register: Joi.object()
        .keys({
            body: Joi.object().keys({
                first_name: Joi.string().min(1).max(20),
                last_name: Joi.string().min(1).max(20),
                username: Joi.string().alphanum().min(3).max(50),
                ...commonBody
            })
        })
        .unknown(true),
    login: Joi.object()
        .keys({
            body: Joi.object().keys({
                ...commonBody
            })
        })
        .unknown(true),
    changePassword: Joi.object()
        .keys({
            body: Joi.object().keys({
                email: Joi.string().lowercase().email().min(5).max(50).required(),
                old_password: Joi.string().min(6).required(),
                new_password: Joi.string().min(6).required(),
            })
        })
        .unknown(true),
    resetPassword: Joi.object()
        .keys({
            body: Joi.object().keys({
                code: Joi.string().min(6).required(),
                ...commonBody,
            })
        })
        .unknown(true),
    forgotPassword: Joi.object()
        .keys({
            body: Joi.object().keys({
                email: Joi.string().lowercase().email().min(5).max(50).required(),
            })
        })
        .unknown(true),
    createUser: Joi.object()
        .keys({
            body: Joi.object().keys({
                first_name: Joi.string().min(1).max(20),
                last_name: Joi.string().min(1).max(20),
                username: Joi.string().alphanum().min(3).max(50),
                role: Joi.string().valid(ROLE.ADMIN, ROLE.USER, ROLE.NONE),
                gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE, GENDER.UNKNOWN),
                address: Joi.string(),
                phone_number: Joi.string(),
                ...commonBody
            })
        })
        .unknown(true),
    updatedUser: Joi.object()
        .keys({
            body: Joi.object().keys({
                ...updatedUserBody
            })
        })
        .unknown(true),
    bulkUpdatedUser: Joi.object()
        .keys({
            body: Joi.array().items(Joi.object().keys({
                ...updatedUserBody,
                id: Joi.string().required(),
            }))
        })
        .unknown(true),
    bulkDeleteUser: Joi.object()
        .keys({
            body: Joi.array().items(Joi.string())
        })
        .unknown(true)
}

module.exports = AuthSchema;
