const {Users} = require("./users.model");

const {DataTypes} = require("sequelize");
const db = require("../configs/database");

const History = db.define(
    "Histories",
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
        quiz_exam_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_choice: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

History.hasMany(Users, {foreignKey: "user_id"});
Users.belongsTo(History);


History.sync().then((result) => console.log("Table History :", result));

module.exports = History;
