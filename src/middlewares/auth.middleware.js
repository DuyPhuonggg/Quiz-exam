const jwt = require("jsonwebtoken");
require("dotenv").config();
const {ACCESS_TOKEN_SECRET} = process.env
const userServices = require("../services/user.service");
const logger = require("../logger");
const response = require('../helpers/handle-response.helper');
const {ROLE} = require("../constants/user.constant");

const AuthMiddleware = {
    verifyToken: async (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                logger.error(__filename, '', `Token not found`);
                return response.error(res, 401, "Unauthorized");
            }

            const accessToken = bearerToken.split(" ")[1];
            const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
            if (!payload) {
                logger.error(__filename, '', `TOKEN NOT FOUND EXISTS`);
                return response.error(res, 401, "Unauthorized");
            }

            const user = await userServices.findOne({id: payload.userId});
            if (!user) {
                logger.error(__filename, '', `USER NOT FOUND EXISTS`);
                return response.error(res, 401, "NOT FOUND USER");
            }

            req.payload = user.dataValues;
            next();
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, '', message);
            return response.error(res, 500, error);
        }

    },
    permission: async (req, res, next) => {
        const {email, username, role, permissions} = req.payload;
        const {method, baseUrl} = req;

        try {
            const endPoint = method + baseUrl;

            if (role === ROLE.ADMIN || (role !== ROLE.ADMIN && permissions.includes(endPoint))) {
                next()
            } else if (role !== ROLE.ADMIN && !permissions.includes(endPoint)) {
                logger.error(__filename, email || username, `Do not permission`);
                return response.error(res, 403, 'Access denied');
            }
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            return response.error(res, 500, error);
        }
    },
}

module.exports = AuthMiddleware;
