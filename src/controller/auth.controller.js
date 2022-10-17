const authServices = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {
  const data = await authServices.register(req.body, req.headers.client_id);
  const { id, firstName, lastName, username, email, role } = data.user.toJSON();
  return res.status(httpStatus.OK).json({
    message: "Registor successfully",
    data: { id, firstName, lastName, username, email, role },
    tokens: [
      { access_token: data.accessToken, expires: "30 minutes" },
      { refresh_token: data.refreshToken, expires: "1 day" }
    ]
  });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const clientId = req.headers.client_id;
  const data = await authServices.login(username, password, clientId);
  return res.status(httpStatus.OK).json({
    status: "Log-in successfully",
    tokens: [
      { access_token: data.accessToken, expires: "30 minutes" },
      { refresh_token: data.refreshToken, expires: "1 day" }
    ]
  });
});

const logout = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const clientId = req.headers.client_id;
  await authServices.logout(userId, clientId);
  return res.status(httpStatus.OK).json({ status: "Log-out successfully" });
});

const refreshToken = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const clientId = req.headers.client_id;
  const data = await authServices.refreshToken(userId, clientId);
  return res.status(httpStatus.OK).json({
    status: "Refresh Token Successfully",
    tokens: [
      { access_token: data.newAccessToken, expires: "30 minutes" },
      { refresh_token: data.newRefreshToken.refresh_token, expires: "1 day" }
    ]
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
