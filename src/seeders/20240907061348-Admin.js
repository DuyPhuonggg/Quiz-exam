'use strict';
const {ROLE, GENDER} = require("../constants/user.constant");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                first_name: 'Phuong',
                last_name: 'Kieu Duy',
                email: 'admin@admin.com',
                username: 'Phuong KD',
                password: '$2b$10$FAfHeeMbfDnOSPmc4syuhOlPEsdit9MbYTvY00qwBu.qoEne.fwyK',
                role: ROLE.ADMIN,
                gender: GENDER.MALE,
                phone_number: '0969044253',
                address: 'Nam Cường, Tam Đồng, Mê Linh, Hà Nội',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', {
            email: 'admin@admin.com',
            role: ROLE.ADMIN,
        }, {});
    }
};
