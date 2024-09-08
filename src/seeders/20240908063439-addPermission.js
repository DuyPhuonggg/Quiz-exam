'use strict';
const {ROLE} = require("../constants/user.constant");

module.exports = {
    async up(queryInterface, Sequelize) {
        const [user] = await queryInterface.sequelize.query(
            `SELECT * FROM "Permissions" WHERE method = 'ALL' AND base_url = 'all'`
        );

        return await queryInterface.bulkUpdate(
            'Users',
            {
                permissions: [user[0].method]
            },
            {
                email: 'admin@admin.com',
                role: ROLE.ADMIN
            }
        );
    },
    async down(queryInterface) {
        return await queryInterface.bulkUpdate(
            'Users',
            { permissions: [] },
            {
                email: 'admin@admin.com',
                role: ROLE.ADMIN
            }
        );
    }
};
