const multer  = require('multer');
const fs = require('fs');
const diskStorageOptions = {
    destination: (req, file, cb) => {
        const { email, username } = req.payload;
        if (email || username){
            fs.mkdirSync(`uploads/${email || username}`, { recursive: true })
            cb(null, `uploads/${email || username}`)
        }
        else {
            cb(null, `uploads/`)
        }
    },
    filename: function (req, file, cb) {
        req.file = file;
        const { email, username } = req.payload;
        let fileName = file.originalname
        if (fs.existsSync(`uploads/${email || username}/${fileName}`)) {
            let fileSplit = file.originalname.split('.');
            fileName = fileSplit.splice(0, fileSplit.length - 1) + '-' + Date.now() + "." + fileSplit[fileSplit.length - 1]
        }

        cb(null, fileName)
    }
};
const storage = multer.diskStorage({
    destination: diskStorageOptions.destination,
    filename: diskStorageOptions.filename
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;