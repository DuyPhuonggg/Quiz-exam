const {Permissions} = require('../models');

const AuthService = {
    findOne: async (condition, ignore = []) => {
        return await Permissions.findOne({
            attributes: {exclude: ignore},
            where: condition,
        });
    },
    findAllPermissions: async (ignore = []) => {
        return await Permissions.findAll({
            attributes: {exclude: ignore}
        });
    }
}

module.exports = AuthService;
