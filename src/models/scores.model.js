const { DataTypes } = require('sequelize');
const db = require('../configs/database');

const Scores = db.define('Scores', {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    result_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_question: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_answer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_no_answer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_incorrect_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});

Scores.sync();

module.exports = Scores;