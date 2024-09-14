const userServices = require("../services/user.service");
const redisServices = require("../services/redis.service");
const authServices = require("../services/auth.service");
const tokenHelper = require("../helpers/token.helper");
const numberHelper = require("../helpers/number.helper");
const response = require("../helpers/handle-response.helper");
const redisKey = require("../constants/redis.constant");
const logger = require("../logger");
const bcrypt = require("bcrypt");
const {OTP_EXPIRE_TIME} = process.env;

const AuthController = {
    getAccessToken: async (req, res) => {
        const {email} = req.body
        try {
            const user = await userServices.findOne({email: email });
            if (!user) {
                logger.error(__filename, email, 'Email does not exists');
                return response.error(res, 404, "Email does not exists");
            }

            const {accessToken} = tokenHelper.createToken({
                userId: user.id,
                username: user.username,
                email: user.email
            });
            logger.success(__filename, email, 'Get token successfully');
            response.success(res, 200, {accessToken}, 'Get token successfully');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email, message);
            response.error(res, 500, "Login failed");
        }
    },
    register: async (req, res) => {
        const {username, email} = req.body;
        try {
            const userExits = await userServices.findOne({email: email});
            if (userExits) {
                return response.error(res, 404, "Email already exists");
            }

            const newUser = await userServices.createOne(req.body);
            if (!newUser) {
                logger.info(__filename, email || username, 'Cannot create user');
                return response.error(res, 404, "Cannot create user");
            }

            logger.info(__filename, email || username, "Register successfully");
            response.success(res, 200, {}, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await userServices.findOne({email: email});
            if (!user) {
                return response.error(res, 404, "Email does not exists");
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                logger.error(__filename, email, 'Password incorrect');
                return response.error(res, 404, "Password incorrect");
            }

            const {accessToken} = tokenHelper.createToken({
                userId: user.id,
                username: user.username,
                email: user.email
            });

            logger.success(__filename, email, 'Login successfully');
            response.success(res, 200, {accessToken}, 'Login successfully');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email, message);
            response.error(res, 500, "Login failed");
        }
    },
    changePassword: async (req, res) => {
        const {email, old_password, new_password} = req.body;
        try {
            const user = await userServices.findOne({email: email});
            if (!user) {
                logger.error(__filename, email, 'Email does not exists');
                return response.error(res, 400, "Email does not exists");
            }

            const isMatchPassword = await bcrypt.compare(old_password, user.password);
            if (!isMatchPassword) {
                logger.error(__filename, email, 'Password incorrect');
                return response.error(res, 400, "Password incorrect");
            }

            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(new_password, salt);
            await userServices.updateOne({email: email}, { password: newPassword});
            logger.success(__filename, email, 'Change password successfully');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email, message);
            response.error(res, 500, "Change password failed");
        }
    },
    forgotPassword: async (req, res) => {
        const {email} = req.body;
        const forgotPasswordKey = `${redisKey.FORGOT_PASSWORD}-${email}`
        try {
            const user = await userServices.findOne({email: email});
            if (!user) {
                logger.error(__filename, email, 'Email does not exists');
                return response.error(res, 404, "Email does not exists");
            }

            let codeOtp = await redisServices.getKey(forgotPasswordKey);
            if (codeOtp) {
                const ttlCodeOtp = await redisServices.getTTL(forgotPasswordKey)
                logger.info(__filename, email, `Time to live of code ${codeOtp} is ${ttlCodeOtp} second(s)`);
                return response.success(res, 200, codeOtp, `Code on time to live ${ttlCodeOtp}`);
            } else {
                codeOtp = numberHelper.random(6);
                await redisServices.setKey(forgotPasswordKey, codeOtp, {EX: OTP_EXPIRE_TIME});
            }

            logger.success(__filename, email, 'Get code successfully');
            response.success(res, 200, codeOtp, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email, message);
            response.error(res, 500, "Forgot password failed");
        }
    },
    resetPassword: async (req, res) => {
        const {email, code, password} = req.body;
        const forgotPasswordKey = `${redisKey.FORGOT_PASSWORD}-${email}`
        try {
            const user = await userServices.findOne({email: email});
            if (!user) {
                logger.error(__filename, email, 'Email does not exists');
                return response.error(res, 404, "Email does not exists");
            }

            const codeOtp = await redisServices.getKey(forgotPasswordKey);
            if (codeOtp === code) {
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(password, salt);
                await userServices.updateOne({email: email}, {password: newPassword});
            } else {
                logger.error(__filename, email, 'Reset password failed');
                return response.error(res, 400, "Reset password failed");
            }

            logger.success(__filename, email, 'Reset password successfully');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email, message);
            response.error(res, 500, "Reset password failed");
        }
    },
    findAllPermissions: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const permission = await authServices.findAllPermissions(['createdAt', 'updatedAt']);
            logger.success(__filename, email || username, 'Get permissions successfully');
            response.success(res, 200, permission ? permission: [], 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Get permissions failed");
        }
    },
    profile: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const profile = await userServices.findOne({
                email: email
            }, ['password', 'access_token', 'refresh_token']);

            if (!profile) {
                return response.error(res, 404, "Not found profile");
            }

            logger.success(__filename, email || username, 'Get profile successfully');
            response.success(res, 200, profile, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Get profile failed");
        }
    },
}

module.exports = AuthController;

