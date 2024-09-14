const response = require("../helpers/handle-response.helper");
const logger = require("../logger");
const questionServices = require("../services/question.service");

const QuestionController = {
    createOne: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkCreate: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findOne: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findAll: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    updateOne: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkUpdate: async (req, res) => {
    const {email, username} = req.payload;
    try {
        const newQuestion = await questionServices.createOne(req.body);
        logger.info(__filename, email || username, "Create user successfully");
        response.success(res, 200, newQuestion, 'OK');
    } catch (error) {
        const message = error.message ? error.message : error;
        logger.error(__filename, email || username, message);
        response.error(res, 500, "Internal Server Error");
    }
},
    deleteOne: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkDelete: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const newQuestion = await questionServices.createOne(req.body);
            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
}

module.exports = QuestionController
