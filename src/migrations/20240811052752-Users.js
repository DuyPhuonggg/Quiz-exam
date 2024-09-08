'use strict';
const {ROLE, GENDER} = require("../constants/user.constant");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            access_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            refresh_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    isLowercase: true,
                },
                unique: true,
            },
            role: {
                type: Sequelize.DataTypes.ENUM,
                values: [ROLE.ADMIN, ROLE.USER, ROLE.NONE],
                defaultValue: ROLE.NONE,
            },
            gender: {
                type: Sequelize.DataTypes.ENUM,
                values: [GENDER.MALE, GENDER.FEMALE, GENDER.UNKNOWN],
                allowNull: true,
            },
            phone_number: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
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
        await queryInterface.dropTable('Users');
    }
};
