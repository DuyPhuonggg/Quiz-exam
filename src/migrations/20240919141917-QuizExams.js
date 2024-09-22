'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('QuizExams', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            image_url: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            images_id: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            question_ids: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
                allowNull: false,
            },
            timer_per_question: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 30 // unit: seconds
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

    async down(queryInterface) {
        await queryInterface.dropTable('QuizExams');
    }
};
