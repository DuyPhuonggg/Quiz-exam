const { DataTypes } = require("sequelize");
const db = require("../configs/database");

const Users = require('./users.model');

const Results = db.define(
    "Results",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

Results.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Results, { foreignKey: "user_id" });

Users.sync()
    .then(() => Results.sync())
    .then((result) => console.log("Table Results:", result))
    .catch((err) => console.error("Error syncing tables:", err));

module.exports = Results;
