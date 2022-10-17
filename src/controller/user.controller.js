const userServices = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createUser = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  const { id, firstName, lastName, username, email, role } = user.toJSON();
  return res.status(httpStatus.CREATED).json({
    message: "Create successfully",
    data: { id, firstName, lastName, username, email, role }
  });
});

const findAllUser = catchAsync(async (req, res) => {
  const data = await userServices.findAllUser(req.query);
  return res.status(httpStatus.OK).json({
    message: "Successfully",
    data: data
  });
});

const findUserById = catchAsync(async (req, res) => {
  const user = await userServices.findUserById(req.params.userId);
  const { id, firstName, lastName, username, email, role } = user.toJSON();
  return res.status(httpStatus.OK).json({
    message: "Successfully",
    data: { id, firstName, lastName, username, email, role }
  });
});

const updatedUser = catchAsync(async (req, res) => {
  const user = await userServices.updateUserById(req.params.userId, req.body);
  const { id, firstName, lastName, username, email, role } = user.toJSON();
  return res.status(httpStatus.OK).json({
    message: "Update successfully",
    data: { id, firstName, lastName, username, email, role }
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await userServices.deleteUserById(req.params.userId);
  return res.status(httpStatus.OK).json({ message: "Delete successfully" });
});

module.exports = {
  createUser,
  findAllUser,
  findUserById,
  updatedUser,
  deleteUser
};
