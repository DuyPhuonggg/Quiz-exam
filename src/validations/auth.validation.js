const Joi = require("joi");

const register = Joi.object().keys({
  body: Joi.object().keys({
    firstName: Joi.string().min(1).max(20),
    lastName: Joi.string().min(1).max(20),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(1).required(),
    email: Joi.string().min(5).max(50).required(),
    role: Joi.string().required()
  })
}).unknown(true);

const login = Joi.object().keys({
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(50).required(),
    password: Joi.string().min(1).required()
  })
});

const logout = Joi.object().keys({
  params: Joi.object().keys({
    userId: Joi.number().integer().required()
  }),
  body: Joi.object().keys({
    refresh_token: Joi.string().required()
  })
});

const refreshToken = Joi.object().keys({
  body: Joi.object().keys({
    refresh_token: Joi.string().required()
  })
});

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
