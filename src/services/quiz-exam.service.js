const { QuizExams } = require("../models");

const QuizServices = {
    find: async (condition, ignore = [], options = {}) => {
        return await QuizExams.findOne({
            attributes: {exclude: ignore},
            where: condition,
            ...options
        });
    },
    create: async (data) => {
        return await QuizExams.create({...data});
    },
    findAllAndCount: async (condition, options = {}, ignore = []) => {
        const {count, rows} = await QuizExams.findAndCountAll({
            where: condition,
            attributes: {exclude: ignore},
            ...options,
        });

        return {
            count,
            data: rows?.length ? rows : [],
        }
    },
    update: async (condition, bodyUpdated) => {
        return await QuizExams.update(bodyUpdated,{
            where: { ...condition },
        },)
    },
    delete: async (condition) => {
        return await QuizExams.destroy({
            where: { ...condition },
        })
    }
}

module.exports = QuizServices;
