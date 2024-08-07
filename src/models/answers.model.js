const { DataTypes } = require("sequelize");
const db = require("../configs/database");
const { Questions } = require("./index");
const { AnswersTypes } = require("../constant/enum");

const Answers = db.define(
  "Answers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    is_correct: {
      type: DataTypes.ENUM,
      values: [AnswersTypes.FALSE, AnswersTypes.TRUE],
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    freezeTableName: true
  }
);

Questions.hasMany(Answers, { foreignKey: "question_id" });
Answers.belongsTo(Questions, { foreignKey: "question_id", targetKey: "id" });

Answers.sync();

module.exports = Answers;
