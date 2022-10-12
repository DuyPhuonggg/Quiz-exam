const { DataTypes } = require('sequelize');
const db = require('../configs/database');
const { Questions } = require('./index');

const ResultsUser = db.define('Results user', {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_choice: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});


Questions.hasMany(ResultsUser, { foreignKey: "question_id" });
ResultsUser.belongsTo(Questions, { foreignKey: "question_id", targetKey: "id" });

ResultsUser.sync();

module.exports = ResultsUser;