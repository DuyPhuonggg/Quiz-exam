const authServices = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/handle-response");
const logger = require("../logger");

const register = async (req, res) => {
    const { username } = req.body;
    try {
        const data = await authServices.register(req.body);
        response.success(res, 200, data, 'OK')
    } catch (error) {
        logger.error(__filename, username, error);
        response.error(res, 500, error.toString());
    }
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        // const data = await authServices.login(username, password, clientId);
        return response.success(res, 200, {username, password}, 'Login successfully');
    } catch (e) {
        console.log(e)
    }

};

const logout = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const clientId = req.headers.client_id;
    await authServices.logout(userId, clientId);
    res.send(data);
});

const refreshToken = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const clientId = req.headers.client_id;
    const data = await authServices.refreshToken(userId, clientId);
    res.send(data);
});

const forgotPassword = catchAsync(async (req, res) => {
    const username = req.body.username;
    const newPassword = await authServices.forgotPassword(username);
    res.send(data);
})
module.exports = {
    register,
    login,
    logout,
    refreshToken,
    forgotPassword
};
