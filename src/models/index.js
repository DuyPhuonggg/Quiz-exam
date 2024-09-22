const Sequelize = require('sequelize');
const db = require('../configs/database');

const Questions = require('./questions.model');
const QuizExams = require('./quiz-exam.model');
const Users = require('./users.model');
const Permissions = require('./permissions.model');
const Categories = require('./categories.model');

const models = {
    Users: Users(db, Sequelize.DataTypes),
    Permissions: Permissions(db, Sequelize.DataTypes),
    Categories: Categories(db, Sequelize.DataTypes),
    Questions: Questions(db, Sequelize.DataTypes),
    QuizExams: QuizExams(db, Sequelize.DataTypes),
};

models.Questions.belongsToMany(models.QuizExams, {
    through: 'Questions_QuizExams',
    foreignKey: 'question_id',
    otherKey: 'quiz_id'
});

models.QuizExams.belongsToMany(models.Questions, {
    through: 'Questions_QuizExams',
    foreignKey: 'quiz_id',
    otherKey: 'question_id'
});

module.exports = models;
