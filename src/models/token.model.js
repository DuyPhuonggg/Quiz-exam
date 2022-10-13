const db = require("../configs/database");
const { DataTypes } = require("sequelize");

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
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expired_in: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    createdAt: DataTypes.DATE
  },
  {
    freezeTableName: true
  }
);

Token.sync();

module.exports = Token;
