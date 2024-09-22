const {Questions, Categories} = require("../models");

const QuestionServices = {
    createOne: async (data) => {
        return await Questions.create(data);
    },
    createMany: async (data) => {
        return await Questions.bulkCreate(data);
    },
    findCategories: async (ignore = [], options = {}) => {
        return await Categories.findAll({
            attributes: {exclude: ignore},
            ...options
        });
    },
    findCategory: async (condition, ignore = []) => {
        return await Categories.findOne({
            attributes: {exclude: ignore},
            where: condition,
        })
    },
    findAllAndCount: async (condition, options = {}, ignore = []) => {
        const {count, rows} = await Questions.findAndCountAll({
            ...options,
            where: condition,
            attributes: {exclude: ignore}
        });

        return {
            count,
            data: rows?.length ? rows : [],
        }
    },
    find: async (condition, ignore = []) => {
        return await Questions.findOne({
            attributes: {exclude: ignore},
            where: condition,
        })
    },
    update: async (condition, body) => {
        return await Questions.update(
            {...body},
            {where: condition}
        );
    },
    delete: async (condition) => {
        return await Questions.destroy({
            where: {...condition},
        })
    }
}

module.exports = QuestionServices;
