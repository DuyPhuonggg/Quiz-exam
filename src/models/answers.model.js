const { DataTypes } = require('sequelize');
const db = require('../configs/database');
const {Questions} = require('./index')

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
    is_correct: {
        type: DataTypes.BOOLEAN,
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});


Questions.hasMany(Answers, { foreignKey: "question_id" });
Answers.belongsTo(Questions,{ foreignKey: "question_id", targetKey: "id" });

Answers.sync();

module.exports = Answers;