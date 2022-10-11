const userServices = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    return res.status(200).json({ 
      statusCode: 200,
      message: "Create successfully",
      data: user 
    });
  } catch (err) {
    return res.status(500).json({ 
      statusCode: 500,
      message: err
    });
  }
};

const findAllUser = async (req, res) => {
  try {
    const users = await userServices.findAllUser();
    return res.status(200).json({ 
      statusCode: 200,
      message: "Successfully", 
      data: users });
  } catch (err) {
    return res.status(500).json({ 
      statusCode: 500,
      message: err
    });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await userServices.findUserById(req.params.userId);
    return res.status(200).json({ 
      statusCode: 200,
      message: "Successfully", 
      data: user });
  } catch (err) {
    return res.status(500).json({ 
      statusCode: 500,
      message: err 
    });
  }
};

const updatedUser = async (req, res) => {
  try {
    const user = await userServices.updateUserById(req.params.userId,req.body);
    return res.status(200).json({ 
      statusCode: 200,
      message: "Update successfully", 
      data: user 
    });
  } catch (err) {
    return res.status(500).json({ 
      statusCode: 500,
       message: err
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userServices.deleteUserById(req.params.userId);
    return res.status(200).json({ 
      statusCode:200,
      message: "Delete successfully"
     });
  } catch (err) {
    return res.status(500).json({ 
      statusCode:500,
      message: err 
    });
  }
};

module.exports = {
  createUser,
  findAllUser,
  findUserById,
  updatedUser,
  deleteUser
};
