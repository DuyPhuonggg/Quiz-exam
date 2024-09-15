'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users','permissions', {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('Users', 'permissions');
    }
};
