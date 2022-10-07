const { DataTypes } = require('sequelize');
const db = require('../configs/database');
const { AnswersTypes } = require('../configs/enum')

const Answers = db.define('Answers', {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: DataTypes.ENUM,
        values: [AnswersTypes.True, AnswersTypes.False],
        allowNull: false,
        unique: false
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});

Answers.sync();

module.exports = Answers;