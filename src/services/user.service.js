const Users = require("../models/users.model");
const pagination = require("../utils/pagination");
const bcrypt = require("bcrypt");

const UserService = {
    createOne: async (data) => {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        return await Users.create({...data});
    },
    findOne: async (condition, attributes = []) => {
        return await Users.findOne({
            attributes: { exclude: attributes },
            where: condition,
        })
    },
    findAll: async (options) => {
        const {page, size} = options;
        const {limit, offset} = pagination.getPagination(
            parseInt(page),
            parseInt(size)
        );
        const users = await Users.findAndCountAll({
            limit: limit,
            offset: offset,
            attributes: ["id", "firstName", "lastName", "username", "email"]
        });
        return pagination.getPaginationData(users, page, size);
    },
    updateOne: async (condition, body) => {
        return await Users.update(
    {...body},
    { where: condition }
        );
    },
    deleteOne: async (condition) => {
        return await Users.destroy({where: condition});
    },
}

module.exports = UserService;
