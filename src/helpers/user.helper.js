const authService = require("../services/auth.service");

const UserHelper = {
    convertPermissionToString: async (permissionsId) => {
        const permissionMapping = []
        if (permissionsId?.length) {
            for (let permissionId of permissionsId) {
                const permissionModel = await authService.findOne({
                    id: permissionId
                })

                if (permissionModel) {
                    permissionMapping.push(permissionModel.dataValues.method + permissionModel.dataValues.base_url)
                }
            }
        }

        return permissionMapping;
    }
}

module.exports = UserHelper;