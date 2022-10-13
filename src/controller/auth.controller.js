const authServices = require("../services/auth.service");
const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");

const register = async (req, res) => {
  try {
    const newUser = await userServices.createUser(req.body);
    const accessToken = tokenServices.generateAccessToken(newUser.id);
    const refreshToken = tokenServices.generateRefreshToken(newUser.id);
    await tokenServices.saveToken(newUser.id, refreshToken);
    return res.status(200).json({
      statusCode: 200,
      message: "Registor successfully",
      data: {
        user: newUser,
        tokens: [
          {
            access_token: accessToken,
            expires: "30 minutes"
          },
          {
            refresh_token: refreshToken,
            expires: "1 day"
          }
        ]
      }
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
    const user = await userServices.findUserByUsername(username);
    if (!user || user.password != password) {
      return res.status(400).json({
        statusCode: 400,
        message: "Username or password incorrect!"
      });
    }
    const accessToken = tokenServices.generateAccessToken(user.id);
    const refreshToken = tokenServices.generateRefreshToken(user.id);
    await tokenServices.saveToken(user.id, refreshToken);
    return res.status(200).json({
      statusCode: 200,
      status: "Log-in successfully",
      data: {
        user: user,
        tokens: [
          {
            access_token: accessToken,
            expires: "30 minutes"
          },
          {
            refresh_token: refreshToken,
            expires: "1 day"
          }
        ]
      }
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const refreshTokenDoc = await authServices.logout(refreshToken);
    if (refreshTokenDoc) {
    }
    return res.status(200).json({
      statusCode: 200,
      status: "Log-out successfully"
    });
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: error
    });
  }
};

module.exports = {
  register,
  login,
  logout
};
