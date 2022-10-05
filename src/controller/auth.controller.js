const { autherService, userService } = require('../services/user.service');
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { authServices } = require('../services');

const register = catchAsync(async (req,res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthToken(user);
    res.status(httpStatus.CREATED).send({ user, tokens});
});

const login = catchAsync(async (req,res) => {
    const {username, password } = req.body
    const user = await authServices.login(username,password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens});
});

const logout = catchAsync(async (req,res) => {
    await authServices.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    register,
    login,
    logout
}