'use strict';
const PERMISSION= require("../constants/permission.constant");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Permissions', PERMISSION.map((permission => (
            {
                ...permission,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ))));
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Permissions', null, {});
    }
};
