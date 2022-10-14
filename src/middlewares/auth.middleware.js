const jwt = require('jsonwebtoken');
require('dotenv').config();
const { role } = require("../constant/enum");

const verifyAccessToken = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        const userId = req.params.id;
        const roleQuery = req.query.role;
        console.log(roleQuery, parseInt(userId),'2222222222');
        if(token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
                if(error) throw new Error("Unauthorization!");
                req.payload = payload;
                console.log(role.ADMIN,'333333333');
                if(roleQuery === role.ADMIN && payload.aud === parseInt(userId)) ;
                else if(roleQuery === role.USER && payload.aud === parseInt(userId));
                else throw new Error("Unathorization!");
                next();
            });
        }
    } catch (error) {
        return res.status(406).json({ 
            statusCode: 406,
            message: 'Not Acceptable' 
        });
    }
}

module.exports = {
    verifyAccessToken
}