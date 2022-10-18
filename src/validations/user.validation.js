const Joi = require("joi");
const { role } = require("../constant/enum");

const createUser = Joi.object()
  .keys({
    body: Joi.object().keys({
      firstName: Joi.string().min(1).max(20),
      lastName: Joi.string().min(1).max(20),
      username: Joi.string().alphanum().min(3).max(50).required(),
      password: Joi.string().min(1).required(),
      email: Joi.string().lowercase().email().min(5).max(50).required(),
      role: Joi.string().valid(role.ADMIN, role.USER)
    })
  })
  .unknown(true);

const getUsers = Joi.object()
  .keys({
    query: Joi.object({
      role: Joi.string(),
      q: Joi.string(),
      size: Joi.number().integer(),
      page: Joi.number().integer()
    })
  })
  .unknown(true);

const getUser = Joi.object()
  .keys({
    params: Joi.object().keys({
      userId: Joi.number().integer().required()
    })
  })
  .unknown(true);

const updateUser = Joi.object()
  .keys({
    params: Joi.object({
      userId: Joi.number().min(1).required()
    }),
    body: Joi.object().keys({
      firstName: Joi.string().min(1).max(20),
      lastName: Joi.string().min(1).max(20),
      username: Joi.string().alphanum().min(3).max(50).required(),
      password: Joi.string().min(1).required(),
      email: Joi.string().lowercase().email().min(5).max(50).required(),
      role: Joi.string().valid(role.ADMIN, role.USER)
    })
  })
  .unknown(true);

const deleteUser = Joi.object()
  .keys({
    params: Joi.object({
      userId: Joi.number().integer().required()
    })
  })
  .unknown(true);

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
