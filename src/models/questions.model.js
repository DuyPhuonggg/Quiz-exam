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
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        images_url: {
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
        quiz_exam_id: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

Questions.sync().then((result) => console.log("Table Questions :", result));


module.exports = Questions;
