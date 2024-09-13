const {DataTypes} = require("sequelize");
const db = require("../configs/database");

const Questions = db.define(
    "Questions",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        images_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        images_id: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        correct_answers: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        incorrect_answers: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
                isLowercase: true,
            },
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = Questions;
