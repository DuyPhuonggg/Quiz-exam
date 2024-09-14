const path = require('path');
const fs = require('fs');
const response = require('../helpers/handle-response.helper');
const logger = require("../logger");
const externalService = require("../services/external.service");

const ExternalController =  {
    uploadSingleFile: async (req, res) => {
        const {email, username} = req.payload;
        const { file } = req;
        try {
            const filePath = path.resolve(`uploads/${email || username}`, file.filename);
            const options = {
                folder: `quiz-exam-api/attachment/images/${email || username}`
            }
            const {public_id , url} = await externalService.uploadOne(filePath, options);

            if (!public_id || !url) {
                await fs.unlinkSync(filePath);
                logger.error(__filename, email || username, 'UPLOAD FILE FAILED');
                return response.error(res, 400, 'Upload failed');
            }
            await fs.unlinkSync(filePath);
            logger.success(__filename, email || username, 'UPLOAD SINGLE FILE SUCCESS');
            response.success(res, 200, {publicId: public_id, url}, 'Upload file successfully');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            return response.error(res, 500, error);
        }
    },
    deleteSingleFile: async (req, res) => {
        const {email, username} = req.payload;
        const {public_id: publicId} = req.body;
        try {
            if (!publicId) {
                logger.error(__filename, email || username, 'DELETE FILE FAILED');
                return response.error(res, 400, 'Delete file failed');
            }

            await externalService.deleteOne(publicId);
            logger.success(__filename, email || username, 'DELETE SINGLE FILE SUCCESS');
            response.success(res, 200, "", 'Delete file successfully');
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, email || username, message);
            return response.error(res, 500, error);
        }
    }
}

module.exports = ExternalController;