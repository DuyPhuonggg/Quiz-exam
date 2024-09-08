const userServices = require("../services/user.service");
const response = require("../helpers/handle-response.helper");
const logger = require("../logger");
const {ROLE} = require('../constants/user.constant');
const commonHelper = require("../helpers/common.helper");
const userHelper = require("../helpers/user.helper");
const {Op} = require("sequelize");

const UserController = {
    createOne: async (req, res) => {
        const {email, username} = req.payload;
        try {
            const existUser = await userServices.findOne({email: req.body.email});
            if (existUser) {
                return response.error(res, 404, "Already exist user");
            }

            const newUser = await userServices.createOne(req.body);
            if (!newUser) {
                return response.error(res, 404, "Cannot create user");
            }

            logger.info(__filename, email || username, "Create user successfully");
            response.success(res, 200, {}, 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }

    },
    findAll: async (req, res) => {
        const {email, username} = req.payload;
        const {page, size, email: emailQuery} = req.query;
        try {
            const {limit, offset} = commonHelper.getPagination(page, size)
            const options = {
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            };

            const condition = {
                ...(emailQuery && {email: {[Op.like]: `%${emailQuery}%`}}),
                role: {
                    [Op.in]: [ROLE.USER, ROLE.NONE]
                },
            }

            const {count, data} = await userServices.findAllAndCount(
                condition,
                options,
                ['password', 'access_token', 'refresh_token', 'permissions'],
            );
            logger.success(__filename, email, 'Get list users successfully');
            response.success(res, 200, {count, data});
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    findById: async (req, res) => {
        const {email, username} = req.payload;
        const {id: userId} = req.params;
        try {
            const user = await userServices.findOne(
                {id: userId},
                ['password', 'access_token', 'refresh_token'],
            );

            if (!user) {
                return response.error(res, 500, "User not found");
            }

            logger.success(__filename, email, 'Get user successfully');
            response.success(res, 200, user);
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkUpdate: async (req, res) => {
        const {email, username} = req.payload;
        const users = req.body;
        try {
            if (!users.length) {
                logger.info(__filename, email || username, 'Empty data to bulk updated users');
                return response.success(res, 200, '', 'OK');
            }

            for (let user of users) {
                const { id: userId, ...updatedBody } = user;
                const userModel = await userServices.findOne({id: userId});
                const permissionMapping = await userHelper.convertPermissionToString(updatedBody?.permissionsId);

                if (userModel) {
                    await userServices.updateOne({
                        id: userModel.dataValues.id
                    }, {
                        ...updatedBody,
                        permissions: permissionMapping.length ? permissionMapping : userModel.dataValues.permissions,
                    })
                }
            }

            logger.success(__filename, email || username, 'Updated users successfully');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    updatedOne: async (req, res) => {
        const {email, username} = req.payload;
        const {id: userId} = req.params;
        const {permissionsId} = req.body;
        try {
            const user = await userServices.findOne(
                {id: userId},
                ['password', 'access_token', 'refresh_token'],
            );
            if (!user) {
                return response.error(res, 500, "User not found");
            }

            const permissionMapping = await userHelper.convertPermissionToString(permissionsId);

            await userServices.updateOne({
                id: user.dataValues.id
            }, {
                ...req.body,
                permissions: permissionMapping.length ? permissionMapping : user.dataValues.permissions,
            })

            logger.success(__filename, email, 'Updated user successfully');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    deleteOne: async (req, res) => {
        const {email, username} = req.payload;
        const {id: userId} = req.params;
        try {
            const user = await userServices.findOne(
                {id: userId},
                ['password', 'access_token', 'refresh_token'],
            );
            if (!user) {
                return response.error(res, 500, "User not found");
            }

            await userServices.deleteOne({id: user.dataValues.id});
            logger.success(__filename, email, 'Delete user successfully');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
    bulkDelete: async (req, res) => {
        const {email, username} = req.payload;
        const usersId = req.body;
        try {
            if (!usersId.length) {
                logger.info(__filename, email || username, 'Empty data to bulk delete users');
                return response.success(res, 200, '', 'OK');
            }

            for (let userId of usersId) {
                const userModel = await userServices.findOne({id: userId});
                if (userModel) {
                    await userServices.deleteOne({id: userModel.dataValues.id});
                }
            }

            logger.success(__filename, email, 'Delete users successfully');
            response.success(res, 200, '', 'OK');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            response.error(res, 500, "Internal Server Error");
        }
    },
}

module.exports = UserController;
