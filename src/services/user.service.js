const { Users } = require("../models");
const bcrypt = require("bcrypt");

const UserService = {
    createOne: async (data) => {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        return await Users.create({...data});
    },
    findOne: async (condition, ignore = []) => {
        return await Users.findOne({
            attributes: {exclude: ignore},
            where: condition,
        })
    },
    findAllAndCount: async (condition, options, ignore = []) => {
        const {count, rows} = await Users.findAndCountAll({
            ...options,
            where: condition,
            attributes: {exclude: ignore}
        });

        return {
            count,
            data: rows?.length ? rows : [],
        }
    },
    updateOne: async (condition, body) => {
        return await Users.update(
            {...body},
            {where: condition}
        );
    },
    deleteOne: async (condition) => {
        return await Users.destroy({where: condition});
    },
}

module.exports = UserService;
