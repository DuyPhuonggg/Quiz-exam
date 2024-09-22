const response = require("../helpers/handle-response.helper");
const logger = require("../logger");
const quizServices = require("../services/quiz-exam.service");
const questionServices = require("../services/question.service");
const commonHelper = require("../helpers/common.helper");
const {Op} = require("sequelize");

const QuizController = {
    createOne: async (req, res) => {
        const {email, username} = req.payload;
        const {name, question_ids: questionIds} = req.body;
        try {
            const exitsQuiz = await quizServices.find({
                name: name.trim(),
            });

            if (exitsQuiz) {
                return response.error(res, 500, "Quiz-exam already exist");
            }

            // check exist question
            const questionIdsMapping = await Promise.all(questionIds.map((questionId) => {
                const ignore = ['title', 'categories', 'images_url', 'images_id', 'correct_answers', 'incorrect_answers', 'author', 'createdAt', 'updatedAt']
                return questionServices.find({id: questionId}, ignore).then(a => ({
                    id: a?.dataValues?.id, questionId: questionId
                }))
            }))

            if (questionIdsMapping.some((v) => !v?.id)) {
                return response.error(res, 500, `Question does not exist ${questionIdsMapping.filter(v => v.id === undefined).map(v => v.questionId)}`);
            }

            const quizBody = {
                ...req.body, name: name.trim(),
                author: email || username
            }
            const newQuiz = await quizServices.create(quizBody);

            logger.success(__filename, email || username, "Create quiz");
            response.success(res, 200, newQuiz, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findOne: async (req, res) => {
        const {email, username} = req.payload;
        const {id: quizId} = req.params;
        try {
            if (!quizId || ['null', 'undefined'].includes(quizId)) {
                return response.error(res, 404, "Bad Request");
            }

            const quiz = await quizServices.find(
                {id: quizId},
                ['createdAt', 'updatedAt']
            );
            if (!quiz) {
                return response.error(res, 404, "Quiz does not exist");
            }

            logger.success(__filename, email || username, "Get quiz");
            response.success(res, 200, quiz, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findAll: async (req, res) => {
        const {email, username} = req.payload;
        const {page, size, name} = req.query;
        try {
            const {limit, offset} = commonHelper.getPagination(page, size)
            const options = {
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            };

            const condition = {
                ...(name && {name: {[Op.like]: `%${name}%`}}),
            }

            const ignoreAttribute = ['question_ids', 'images_id'];
            const listQuiz = await quizServices.findAllAndCount(condition, options, ignoreAttribute);
            logger.success(__filename, email || username, "Get quiz(s)");
            response.success(res, 200, listQuiz, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    updateOne: async (req, res) => {
        const {email, username} = req.payload;
        const {id: quizId} = req.params;
        try {
            if (!quizId || ['null', 'undefined'].includes(quizId) || Object.keys(req.body).length === 0) {
                return response.error(res, 404, "Bad Request");
            }

            const quiz = await quizServices.find(
                {id: quizId},
                ['createdAt', 'updatedAt']
            );
            if (!quiz) {
                logger.info(__filename, email || username, 'Quiz does not exist');
                return response.error(res, 404, "Quiz does not exist");
            }

            await quizServices.update({
                id: quizId
            }, req.body);
            logger.success(__filename, email || username, "Updated quiz");
            response.success(res, 200, '', 'Updated quiz success');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    deleteOne: async (req, res) => {
        const {email, username} = req.payload;
        const {id} = req.params;
        try {
            if (!id || ['null', 'undefined'].includes(id)) {
                return response.error(res, 400, 'Bad request');
            }

            const existQuiz = await quizServices.find({
                id: id
            })

            if (!existQuiz) {
                return response.error(res, 400, 'Not found');
            }

            await quizServices.delete({id: id});
            logger.success(__filename, email || username, "Delete quiz");
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkDelete: async (req, res) => {
        const {email, username} = req.payload;
        const quizIds = req.body;
        try {
            if (!quizIds.length) {
                logger.error(__filename, email || username, 'Empty data to bulk delete quizzes');
                return response.error(res, 400, 'body must be an array');
            }

            for (let quizId of quizIds) {
                const quizModel = await quizServices.find({id: quizId});
                if (quizModel) {
                    await quizServices.delete({id: quizModel.dataValues.id});
                }
            }

            logger.success(__filename, email, 'Delete quiz');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
}

module.exports = QuizController;
