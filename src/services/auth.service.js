const httpStatus = require("http-status");
const { Token } = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const userService = require('../services/user.service');

//login
const loginAccount = async (username, password) => {
    const user = await userService.get(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
    }
    return user;
};


