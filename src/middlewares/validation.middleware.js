const AuthSchema = require('../validations/auth.validation');
const UserSchema = require('../validations/user.validation');
const QuestionSchema = require('../validations/question.validation');
const QuizSchema = require('../validations/quiz-exam.validation');
const response = require('../helpers/handle-response.helper');
const logger = require('../logger');

const ValidationMiddleware = {
    // Auth
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
    // User
    createUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.create.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    updatedUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.updated.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    bulkUpdatedUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.bulkUpdated.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    bulkDeleteById: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await UserSchema.bulkDelete.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    //Question
    createQuestion: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuestionSchema.create.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    createManyQuestion: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuestionSchema.bulkCreate.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    updateQuestion: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuestionSchema.update.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    //Quiz exam
    createQuiz: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuizSchema.create.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    updateQuiz: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await QuizSchema.updated.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    }
}

module.exports = ValidationMiddleware;
