const jwt = require("jsonwebtoken");
require("dotenv").config();
const { role } = require("../constant/enum");
const httpStatus = require("http-status");

const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userId = req.params.id;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
          if (error) throw new Error("Unauthorization!");
          req.payload = payload;
          if (payload.aud !== parseInt(userId)) throw new Error("Unathorization!");
          next();
        }
      );
    } else throw new Error("Not Found Token");
  } catch (error) {
    return res.status(httpStatus.NOT_ACCEPTABLE).json({
      statusCode: 406,
      message: "Not Acceptable"
    });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
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
