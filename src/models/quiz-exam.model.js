const { Users } = require('./users.model');

const {DataTypes} = require("sequelize");
const db = require("../configs/database");

const QuizExam = db.define(
    "Quiz Exam",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        count_down: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1800 // 30 minutes
        },
        question_ids: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: []
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

QuizExam.hasMany(Users, {foreignKey: "user_id"});
Users.belongsTo(QuizExam);

QuizExam.sync().then((result) => console.log("Table QuizExam :", result));

module.exports = QuizExam;
