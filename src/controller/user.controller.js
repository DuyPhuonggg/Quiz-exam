const userServices = require("../services/user.service");
const response = require("../helpers/handle-response.helper");
const logger = require("../logger")

// const createUser = catchAsync(async (req, res) => {
//     const user = await userServices.createUser(req.body);
//     const {id, firstName, lastName, username, email, role} = user.toJSON();
//     res.send(response(httpStatus.CREATED, "Create successfully", {id, firstName, lastName, username, email, role}));
// });

const getAll = async (req, res) => {
    const { email, username } = req.payload;
    try {
        console.log(req.payload);
    } catch (error) {
        const message = error.message ? error.message : error;
        logger.error(__filename, email || username, message);
        response.error(res, 500, "Internal Server Error");
    }
};

// const findUserById = catchAsync(async (req, res) => {
//     const user = await userServices.findUserById(req.params.userId);
//     const {id, firstName, lastName, username, email, role} = user.toJSON();
//     res.send(response(httpStatus.OK, "Successfully", {id, firstName, lastName, username, email, role}));
// });
//
// const updatedUser = catchAsync(async (req, res) => {
//     const user = await userServices.updateUserById(req.params.userId, req.body, req.file.path);
//     const {id, firstName, lastName, username, email, role, profile_img, cloudinary_id} = user.toJSON();
//     res.send(response(httpStatus.OK, "Update Successfully", {
//         id,
//         firstName,
//         lastName,
//         username,
//         email,
//         role,
//         profile_img,
//         cloudinary_id
//     }));
// });
//
// const deleteUser = catchAsync(async (req, res) => {
//     await userServices.deleteUserById(req.params.userId);
//     res.send(response(httpStatus.OK, "Delete successfully"));
// });



module.exports = {
    // createUser,
    getAll,
    // findUserById,
    // updatedUser,
    // deleteUser
};
