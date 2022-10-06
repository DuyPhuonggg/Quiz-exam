const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Users = require('../models/user.model');


const createUser = async (req, res) => {
    console.log(req.body);
    try {
        const user = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address,
        });
        return res.status(200).json({ message: "Successfully", data: user});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const findAllUser = async (req,res) => {
    try {
        const users = await Users.findAll({
            limit: 10 
          });
          return res.status(200).json({ message: "Successfully", data: users});
    } catch (err) {
        return res.status(500).json({message: err});
    }

}

const findUserById = async (req,res) => {
    try {
        const user = await Users.findByPk(req.params.userId);
        return res.status(200).json({ message: "Successfully", data: user});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const updatedUser = async (req,res) => {
    try {
        const user = await Users.findByPk(req.params.userId);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not dound");
            }
        await user.update({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                address: req.body.address 
            }, { 
                where: {
                    id: req.params.userId
                }
            });
        return res.status(200).json({ message: "Successfully", data: user}); 
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await user.destroy({
        where: {
            id: req.params.userId
        }
    });
        return res.status(200).json({ message: "Successfully"});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

module.exports = { 
    createUser,
    findAllUser,
    findUserById,
    updatedUser,
    deleteUser
} ;