const authServices = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const response = require("../utils/responseTemp");

const register = catchAsync(async (req, res) => {
  const data = await authServices.register(req.body, req.headers.client_id);
  res.send(response(httpStatus.OK,"Registor successfully", data));
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const clientId = req.headers.client_id;
  const data = await authServices.login(username, password, clientId);
  res.send(response(httpStatus.OK,"Log-in successfully", data));
});

const logout = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const clientId = req.headers.client_id;
  await authServices.logout(userId, clientId);
  res.send(response(httpStatus.OK, "Log-out suscessfully"));
});

const refreshToken = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const clientId = req.headers.client_id;
  const data = await authServices.refreshToken(userId, clientId);
  res.send(response(httpStatus.OK,"Refresh successfully", data));
});

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
