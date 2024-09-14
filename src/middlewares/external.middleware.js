const logger = require("../logger");
const response = require("../helpers/handle-response.helper");
const {MAXIMUM_SIZE, MIME_TYPE} = require('../constants/external.constant');
const fs = require("fs");
const path = require("path");

const ExternalMiddleware = {
    verifyFile: async (req, res, next) => {
        const { email, username } = req.payload;
        const { file } = req;
        try {
            if (!file) {
                logger.error(__filename, email || username, 'UPLOAD FILE FAILED');
                return response.error(res, 404, 'File not found');
            }

            const { mimetype, size, filename }= file;

            if (!MIME_TYPE.includes(mimetype)) {
                await fs.unlinkSync(path.resolve(`uploads/${email || username}`, filename));
                logger.error(__filename, email || username, 'NOT ALLOW FILE TYPE');
                return response.error(res, 404, 'Not allow accepting image type');
            }

            if (size > MAXIMUM_SIZE) {
                await fs.unlinkSync(path.resolve(`uploads/${email || username}`, filename));
                logger.error(__filename, email || username, 'FILE SIZE LARGER');
                return response.error(res, 404, 'Size image are larger than 10 MB');
            }

            next()
        } catch (error) {
            const message = error.message ? error.message : error;
            logger.error(__filename, '', message);
            return response.error(res, 500, error);
        }

    }
}

module.exports = ExternalMiddleware;