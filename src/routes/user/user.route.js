const express = require("express");
const router = express.Router();
const userController = require('../../controller/user.controller');

router.get("/", userController.findAllUser);
router.get("/:userId", userController.findUserById);
router.put("/:userId", userController.updatedUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;