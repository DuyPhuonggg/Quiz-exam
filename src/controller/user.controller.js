const { userService } = require('../services/user.service');
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');


const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
})

const findAllUser = catchAsync(async (req,res) => {
    const result = await userService.findAllUser(data);
    res.send(result);
})

const findUserById = catchAsync(async (req,res) => {
    const user = await userService.findUserById(req.params.userId);
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
})

const updatedUser = catchAsync(async (req,res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
})

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
  });

module.exports = { 
    createUser,
    findAllUser,
    findUserById,
    updatedUser,
    deleteUser
} ;