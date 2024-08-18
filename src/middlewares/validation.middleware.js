const {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema,
} = require('../validations/auth.validation');
const response = require('../helpers/handle-response.helper');
const logger = require('../logger');

const register = async (req, res, next) => {
    const {email, username} = req.body;
    const {error} = await registerSchema.validate(req);
    if (error) {
        logger.info(__filename, email || username || 'Unknown', error?.details);
        return response.error(res, 404, error?.details[0]?.message);
    }
    next()
};

const login = async (req, res, next) => {
    const {email} = req.body;
    const {error} = await loginSchema.validate(req);
    if (error) {
        logger.info(__filename, email || 'Unknown', error?.details);
        return response.error(res, 404, error?.details[0]?.message);
    }
    next()
}

const changePassword = async (req, res, next) => {
    const {email} = req.body;
    const {error} = await changePasswordSchema.validate(req);
    if (error) {
        logger.info(__filename, email || 'Unknown', error?.details);
        return response.error(res, 404, error?.details[0]?.message);
    }
    next()
}

const forgotPassword = async (req, res, next) => {
    const {email} = req.body;
    const {error} = await forgotPasswordSchema.validate(req);
    if (error) {
        logger.info(__filename, email || 'Unknown', error?.details);
        return response.error(res, 404, error?.details[0]?.message);
    }
    next()
}

const resetPassword = async (req, res, next) => {
    const {email} = req.body;
    const {error} = await resetPasswordSchema.validate(req);
    if (error) {
        logger.info(__filename, email || 'Unknown', error?.details);
        return response.error(res, 404, error?.details[0]?.message);
    }
    next()
}

module.exports = {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword
};
