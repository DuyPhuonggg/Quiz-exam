const db = require("../configs/database");
const { DataTypes } = require("sequelize");
const { EXPRISE_TIME } = require("../constant/enum");

const Token = db.define(
  "Token",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expired_in: {
      type: DataTypes.STRING,
      defaultValue: EXPRISE_TIME.REFRESH_TOKEN
    },
    createdAt: DataTypes.DATE
  },
  {
    freezeTableName: true
  }
);

Token.sync();

module.exports = Token;
