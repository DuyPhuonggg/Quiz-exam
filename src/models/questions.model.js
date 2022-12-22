const { DataTypes } = require("sequelize");
const db = require("../configs/database");
const { ResultsUser, Answers } = require("./index");

const Questions = db.define(
  "Questions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    freezeTableName: true
  }
);

Questions.sync();

module.exports = Questions;
