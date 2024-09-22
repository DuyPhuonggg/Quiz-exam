'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Permissions', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            method: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            base_url: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            scope: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
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

    async down(queryInterface) {
        await queryInterface.dropTable('Permissions');
    }
};
