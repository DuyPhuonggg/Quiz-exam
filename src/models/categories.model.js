const Categories = (db , DataTypes) => {
    return  db.define(
        "Categories",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            freezeTableName: true,
            timestamps: true,
        }
    );
}

module.exports = Categories;
