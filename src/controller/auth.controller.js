const httpStatus = require("http-status");
const { signAccessToken, signRefreshToken } = require("../configs/jwt");
const Users = require("../models/user.model");
const Token = require("../models/token.model");
const ApiError = require('../utils/ApiError');

const register = async (req, res) => {
  try {
    const { 
        firstName, 
        lastName, 
        username, 
        password, 
        email, 
        address 
    } = req.body;
    
    if (!username || !password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "incorrect username or password");
    }
    const doesExist = await Users.findOne({
        where: { 
            username: username 
        }
    });
    if (doesExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Already exits user");
    }

    const user = await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      address: address
    });

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    const token = await Token.create({
        user_id: user.id,
        client_id: Math.round((Math.random()*100)),
        refreshToken: refreshToken
    })
    return res.status(200).json({ 
        status: "Registor successfully", 
        content: { 
            user : user, 
            token: token,
            access_token: accessToken,
        } 
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const login = async (req,res) => {
    try {
        const { username, password } = req.body ;
        const user = await Users.findOne({
            attributes: [
                'username',
                'password',
                'email'
            ],
            where: {
                username: username,
                password: password
            }
        })
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, "incorrect username or password");
        }
        const accessToken =  await signAccessToken(user.id);
        const refreshToken = await Token.findOne({
            where:{
                user_id: user.id
            }
        });
        return res.status(200).json({ 
            status: "Login successfully", 
            content: { 
                user : user, 
                access_token: accessToken, 
                refresh_token: refreshToken
            } 
        });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

const logout = async (req,res) => {
    try {
        const refreshToken = await Token.findOne({
            where: {
                refreshToken: req.body.refreshToken
            }
        });

        if (!refreshToken) {
            throw new ApiError(httpStatus.BAD_REQUEST);
        }

        await Token.destroy({
            where: {
                refreshToken: req.body.refreshToken
            }
          });
          return res.status(200).json({ message: "Log-out successfully" });
    }   catch (error) {
        return res.status(500).json({ message: error });
    }
};

const refreshToken = async (req,res) => {}

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
