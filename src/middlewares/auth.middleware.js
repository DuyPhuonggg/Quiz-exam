const jwt = require("jsonwebtoken");
require("dotenv").config();
const { role } = require("../constant/enum");
const httpStatus = require("http-status");
const userServices = require("../services/user.service");

const verifyAccessToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const accessToken = bearerToken.split(" ")[1];
      jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
          if (error) throw new Error("Unauthorization!");
          req.payload = payload;
        }
      );
    } else throw new Error("Not Found Token");
    const user = await userServices.findUserById(req.payload.aud);
    if (!user) throw new Error("Not Found User");
    next();
  } catch (error) {
    return res.status(httpStatus.NOT_ACCEPTABLE).json({
      statusCode: 406,
      message: "Not Acceptable"
    });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const accessToken = bearerToken.split(" ")[1];
      jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
          if (error) throw new Error("Unauthorization!");
          req.payload = payload;
          if (payload.role === role.ADMIN) next();
          else throw new Error("Not Admin!");
        }
      );
    }
  } catch (error) {
    return res.status(httpStatus.NOT_ACCEPTABLE).json({
      statusCode: 406,
      message: "Not Acceptable"
    });
  }
};

module.exports = {
  verifyAccessToken,
  verifyAdmin
};
