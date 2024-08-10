const userServices = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const response = require("../utils/handle-response");
const logger = require("../logger")

const createUser = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    const {id, firstName, lastName, username, email, role} = user.toJSON();
    res.send(response(httpStatus.CREATED, "Create successfully", {id, firstName, lastName, username, email, role}));
});

const findAllUser = catchAsync(async (req, res) => {
    const data = await userServices.findAllUser(req.query);
    res.send(response(httpStatus.OK, "Successfully", data));
});

const findUserById = catchAsync(async (req, res) => {
    const user = await userServices.findUserById(req.params.userId);
    const {id, firstName, lastName, username, email, role} = user.toJSON();
    res.send(response(httpStatus.OK, "Successfully", {id, firstName, lastName, username, email, role}));
});

const updatedUser = catchAsync(async (req, res) => {
    const user = await userServices.updateUserById(req.params.userId, req.body, req.file.path);
    const {id, firstName, lastName, username, email, role, profile_img, cloudinary_id} = user.toJSON();
    res.send(response(httpStatus.OK, "Update Successfully", {
        id,
        firstName,
        lastName,
        username,
        email,
        role,
        profile_img,
        cloudinary_id
    }));
});

const deleteUser = catchAsync(async (req, res) => {
    await userServices.deleteUserById(req.params.userId);
    res.send(response(httpStatus.OK, "Delete successfully"));
});

const login = async (res, req) => {
    try {
        console.log(req.body);

        logger.info("no name", "hihihii");
        return response.success(res, 200, req.body, 'Login success');
        res.send(response(httpStatus.OK, "Delete successfully"));
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    createUser,
    findAllUser,
    findUserById,
    updatedUser,
    deleteUser,
    login
};
