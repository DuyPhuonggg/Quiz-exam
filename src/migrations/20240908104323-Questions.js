'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Questions', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            categories: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            images_url: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            images_id: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            correct_answers: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT),
                allowNull: false,
            },
            incorrect_answers: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT),

                allowNull: false,
            },
            author: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                    isLowercase: true,
                },
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.DataTypes.NOW
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.DataTypes.NOW
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Questions');
    }
};
