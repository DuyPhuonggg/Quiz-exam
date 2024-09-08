const AuthSchema = require('../validations/auth.validation');
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
        const {error} = await AuthSchema.createUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    updatedUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await AuthSchema.updatedUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    bulkUpdatedUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await AuthSchema.bulkUpdatedUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    },
    bulkDeleteUser: async (req, res, next) => {
        const {email, username} = req.body;
        const {error} = await AuthSchema.bulkDeleteUser.validate(req);
        if (error) {
            logger.info(__filename, email || username || 'Unknown', error?.details);
            return response.error(res, 404, error?.details[0]?.message);
        }
        next()
    }
}

module.exports = ValidationMiddleware;
