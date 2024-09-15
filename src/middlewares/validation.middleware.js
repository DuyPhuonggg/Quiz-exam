const AuthSchema = require('../validations/auth.validation');
const UserSchema = require('../validations/user.validation');
const QuestionSchema = require('../validations/question.validation');
const response = require('../helpers/handle-response.helper');
const logger = require('../logger');

const ValidationMiddleware = {
    register: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await AuthSchema.register.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    login: async (req, res, next) => {
        const {email} = req.body;
        const {error} = await AuthSchema.login.validate(req);
        if (error) {
            logger.info(__filename, email || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    changePassword: async (req, res, next) => {
        const {email} = req.body;
        const {error} = await AuthSchema.changePassword.validate(req);
        if (error) {
            logger.info(__filename, email || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    forgotPassword: async (req, res, next) => {
        const {email} = req.body;
        const {error} = await AuthSchema.forgotPassword.validate(req);
        if (error) {
            logger.info(__filename, email || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    resetPassword: async (req, res, next) => {
        const {email} = req.body;
        const {error} = await AuthSchema.resetPassword.validate(req);
        if (error) {
            logger.info(__filename, email || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    createUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.createUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    updatedUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.updatedUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    bulkUpdatedUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.bulkUpdatedUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    bulkDeleteUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.bulkDeleteUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    createQuestion: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuestionSchema.createQuestion.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    createManyQuestion: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuestionSchema.bulkCreateQuestion.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
}

module.exports = ValidationMiddleware;
