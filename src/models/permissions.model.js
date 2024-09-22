const Permissions = (db, DataTypes) => {
    return db.define(
        "Permissions",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            method: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            base_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            scope: {
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

module.exports = Permissions;
