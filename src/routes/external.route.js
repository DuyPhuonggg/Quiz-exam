const express = require("express");
const externalRouter = express.Router();
const multerUpload = require("../configs/multer");
const externalController = require("../controllers/external.controller");
const authMiddlewares = require("../middlewares/auth.middleware");
const externalMiddleware = require("../middlewares/external.middleware");

externalRouter.use(authMiddlewares.verifyToken);
externalRouter.post('/file', multerUpload.single('file'), externalMiddleware.verifyFile, externalController.uploadSingleFile);
externalRouter.delete('/file', externalController.deleteSingleFile);

module.exports = externalRouter;