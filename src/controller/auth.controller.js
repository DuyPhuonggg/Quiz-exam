const authServices = require('../services/auth.service');
const userServices = require('../services/user.service');
const tokenServices = require('../services/token.service');

const register = async (req, res) => {
  try {
    const doesExistUsername = await authServices.checkUsername(req.body.username);
    if (!doesExistUsername) {
        return res.status(400).json({
            statusCode:400,
            message:"Username is already exits!"
        });
    }
    const newUser = await userServices.createUser(req.body);
    const accessToken = await tokenServices.generateAccessToken(newUser.id);
    const refreshToken = await tokenServices.generateRefreshToken(newUser.id);
    await tokenServices.saveToken(newUser.id,refreshToken);
    return res.status(200).json({ 
        statusCode: 200,
        message:"Registor successfully", 
        data: { 
            user : newUser,
            access_token: accessToken,
            refresh_Token: refreshToken
        } 
    });
  } catch (error) {
    return res.status(500).json({ 
        statusCode: 500,
        message: error 
    });
  }
};

const login = async (req,res) => {
    try {
        const { username, password } = req.body ;
        const user = await userServices.findUserByUsername(username);
        if (!user ||  user.password != password) {
            return res.status(400).json({
                statusCode:400,
                message:"Username or password incorrect!"
            }); 
        }
        const accessToken = await tokenServices.generateAccessToken(user.id);
        const refreshToken = await tokenServices.generateRefreshToken(user.id);
        await tokenServices.saveToken(user.id,refreshToken);
        return res.status(200).json({ 
            statusCode: 200,
            status: "Log-in successfully", 
            data: { 
                user : user, 
                access_token: accessToken, 
                refresh_token: refreshToken
            } 
        });
    } catch (error) {
        return res.status(500).json({ 
            statusCode: 500,
            message: error 
        });
    }
};

const logout = async (req,res) => {
    try {
        const userId = req.body.user_id;
        await authServices.logout(userId);
        return res.status(200).json({ 
            statusCode: 200,
            status: "Log-out successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            statusCode: 500,
            message: error
        });
    }
};

module.exports = {
  register,
  login,
  logout
};
