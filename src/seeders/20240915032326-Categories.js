'use strict';
const {CATEGORIES} = require('../constants/question.constant');

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('Categories', CATEGORIES.map((category => (
            {
                ...category,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ))));
    },
    async down(queryInterface) {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};
