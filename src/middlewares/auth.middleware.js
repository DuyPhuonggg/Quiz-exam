const jwt = require("jsonwebtoken");
require("dotenv").config();

const {ACCESS_TOKEN_SECRET} = process.env

const userServices = require("../services/user.service");

const logger = require("../logger");
const response = require('../helpers/handle-response.helper');

const verifyToken = async (req, res, next) => {
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

        const user = await userServices.findById(payload.userId);

        if (!user) {
            logger.error(__filename, '', `USER NOT FOUND EXISTS`);
            return response.error(res, 401, "NOT FOUND USER");
        }

        req.payload = user;
        next();
    } catch (error) {
        const message = error.message ? error.message : error;
        logger.error(__filename, '', message);
        return response.error(res, 500, error);
    }

};

const verifyAdmin = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (bearerToken) {
            const accessToken = bearerToken.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
                    if (error) throw new Error("Unauthorized!");
                    req.payload = payload;
                    if (payload.role === role.ADMIN) next();
                    else throw new Error("Not Admin!");
                }
            );
        }
    } catch (error) {
        return res.status(httpStatus.NOT_ACCEPTABLE).json({
            statusCode: 406,
            message: "Not Acceptable"
        });
    }
};


module.exports = {
    verifyAdmin,
    verifyToken
};
