const authServices = require("../services/auth.service");
const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");

const register = async (req, res) => {
  try {
    const data = await authServices.registor(req.body);
    return res.status(200).json({
      statusCode: 200,
      message: "Registor successfully",
      data: data.user,
      tokens: [
        { access_token: data.accessToken, expires: "30 minutes" },
        { refresh_token: data.refreshToken, expires: "1 day" }
      ]
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: error
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await authServices.login(username, password);
    return res.status(200).json({
      statusCode: 200,
      status: "Log-in successfully",
      data: data.user,
      tokens: [
        { access_token: data.accessToken, expires: "30 minutes" },
        { refresh_token: data.refreshToken, expires: "1 day" }
      ]
    });
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: "User Not Found"
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    await authServices.logout(refreshToken);
    return res.status(200).json({
      statusCode: 200,
      status: "Log-out successfully"
    });
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: "Not Found"
    });
  }
};

const refreshToken = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
