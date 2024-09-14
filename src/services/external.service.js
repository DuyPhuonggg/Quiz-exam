const cloudinary = require('../configs/cloudinary');

const ExternalService = {
    uploadOne: async (filePath, options = {}) => {
        return await cloudinary.uploader.upload(filePath, options);
    },
    deleteOne: async (publicId, options = {}) => {
        return await cloudinary.uploader.destroy(publicId, options)
    }
}

module.exports = ExternalService;