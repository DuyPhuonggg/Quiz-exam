const response = require("../helpers/handle-response.helper");
const logger = require("../logger");
const questionServices = require("../services/question.service");
const commonHelper = require("../helpers/common.helper");
const {Op} = require("sequelize");

const QuestionController = {
    createOne: async (req, res) => {
        const {email, username} = req.payload;
        const {title, categories, images_url, images_id, correct_answers, incorrect_answers} = req.body;
        try {
            const exitsQuestion = await questionServices.findOne({
                title: title,
            });

            if (exitsQuestion) {
                return response.error(res, 500, "Question already exist");
            }

            const categoriesMapping = await Promise.all(categories.map(async (code) => {
                const category = await questionServices.findCategory({code: code});
                return category ? category.dataValues?.description : null
            }));

            if (categoriesMapping.includes(null)) {
                return response.error(res, 500, "Categories does not exist");
            }

            const createBody = {
                title: title,
                categories: categoriesMapping.join(","),
                images_url: images_url,
                images_id: images_id,
                correct_answers: correct_answers.map(v => JSON.stringify(v)),
                incorrect_answers: incorrect_answers.map(v => JSON.stringify(v)),
                author: email || username || 'Unknown'
            }

            const newQuestion = await questionServices.createOne(createBody);
            logger.info(__filename, email || username, "Create question successfully");
            response.success(res, 200, newQuestion, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkCreate: async (req, res) => {
        const {email, username} = req.payload;
        const data = req.body;
        try {
            const questions = await questionServices.createMany(data);
            logger.info(__filename, email || username, "Create questions successfully");
            response.success(res, 200, questions, 'OK');
        } catch (error) {
            logger.error(__filename, email || username, error);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findOne: async (req, res) => {
        const {email, username} = req.payload;
        const { id: questionId } = req.params;
        try {
            if (!questionId || ['null', 'undefined'].includes(questionId)) {
                return response.error(res, 404, "Bad Request");
            }

            const question = await questionServices.find(
                { id: questionId },
                ['createdAt', 'updatedAt']
            );
            logger.info(__filename, email || username, "Get question successfully");
            response.success(res, 200, question, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findAll: async (req, res) => {
        const {email, username} = req.payload;
        const {page, size, title} = req.query;
        try {
            const {limit, offset} = commonHelper.getPagination(page, size)
            const options = {
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            };

            const condition = {
                ...(title && {title: {[Op.like]: `%${title}%`}}),
            }

            const ignoreAttribute = ['correct_answers', 'incorrect_answers']
            const newQuestion = await questionServices.findAllAndCount(condition, options, ignoreAttribute);
            logger.info(__filename, email || username, "Get question(s) successfully");
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
    getCategories: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const ignoreAttr = ['id','createdAt', 'updatedAt'];
            const categories = await questionServices.findCategories(ignoreAttr);
            logger.info(__filename, email || username, "Get categories successfully");
            response.success(res, 200, categories, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
}

module.exports = QuestionController
