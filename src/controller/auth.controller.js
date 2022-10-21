const authServices = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const response = require("../utils/responseTemp");

const register = catchAsync(async (req, res) => {
  const data = await authServices.register(req.body, req.headers.client_id);
  res.send(response(httpStatus.OK,"Registor Successfully", data));
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const clientId = req.headers.client_id;
  const data = await authServices.login(username, password, clientId);
  res.send(response(httpStatus.OK,"Log-in Successfully", data));
});

const logout = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const clientId = req.headers.client_id;
  await authServices.logout(userId, clientId);
  res.send(response(httpStatus.OK, "Log-out Suscessfully"));
});

const refreshToken = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const clientId = req.headers.client_id;
  const data = await authServices.refreshToken(userId, clientId);
  res.send(response(httpStatus.OK,"Refresh Successfully", data));
});

const forgotPassword = catchAsync( async (req, res) => {
  const username = req.body.username;
  const newPassword = await authServices.forgotPassword(username);
  res.send(response(httpStatus.OK,"Update Password Successfully",newPassword));
})
module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword
};
