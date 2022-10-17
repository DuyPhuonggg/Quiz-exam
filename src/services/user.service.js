const Users = require("../models/user.model");
const pagination = require("../utils/pagination");
const bcrypt = require("bcrypt");
const { Op } =require("sequelize");

const createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);
  data.password = hash;
  const  user  = Users.create({ ...data });
  return user ;
};

const findAllUser = async (options) => {
  const { role, page, size } = options;
  const { limit, offset } = pagination.getPagination(
    parseInt(page),
    parseInt(size)
  );
  const users = await Users.findAndCountAll({
    limit: limit,
    offset: offset,
    attributes: ["id", "firstName", "lastName","username", "email"]
  });
  const data = pagination.getPaginationData(users, page, size);
  return data;
};

const findUserById = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const doesExistAccount = async (username, password) => {
  const user = await Users.findOne({
    attributes: ["id", "username", "password", "email", "role"],
    where: { username: username }
  });
  if (!user) throw new Error("Username Incorrect!");
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) throw new Error("Password incorrect!");
  return user;
};

const updateUserById = async (userId, body) => {
  const user = await Users.findByPk(userId);
  if (!user) {
    throw new Error("User Not Found");
  }
  return await user.update(
    {
      ...body
    },
    {
      where: { id: userId }
    }
  );
};

const deleteUserById = async (userId) => {
  const user = await Users.findByPk(userId);
  if (!user) {
    throw new Error("User Not Found");
  }
  await user.destroy({
    where: { id: userId }
  });
};

module.exports = {
  createUser,
  findAllUser,
  findUserById,
  doesExistAccount,
  updateUserById,
  deleteUserById
};
