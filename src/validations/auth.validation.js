const Joi = require("joi");
const { role } = require("../constant/enum");

const register = Joi.object()
  .keys({
    body: Joi.object().keys({
      firstName: Joi.string().min(1).max(20),
      lastName: Joi.string().min(1).max(20),
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(1).required(),
      email: Joi.string().lowercase().email().min(5).max(50).required(),
      role: Joi.string().valid(role.ADMIN,role.USER)
    })
  })
  .unknown(true);

const login = Joi.object()
  .keys({
    body: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(50).required(),
      password: Joi.string().min(1).required()
    })
  })
  .unknown(true);

const logout = Joi.object()
  .keys({
    query: Joi.object().keys({
      role: Joi.string().valid(role.ADMIN,role.USER)
    }),
    body: Joi.object().keys({
      refresh_token: Joi.string().required()
    })
  })
  .unknown(true);

const refreshToken = Joi.object()
  .keys({
    query: Joi.object().keys({
      role: Joi.string().valid(role.ADMIN,role.USER)
    }),
    body: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(50).required(),
      password: Joi.string().min(1).required(),
      refresh_token: Joi.string().required()
    })
  })
  .unknown(true);

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
