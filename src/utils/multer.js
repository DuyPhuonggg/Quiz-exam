const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'utils/')
    //   },
    //   filename: function (req, file, cb) {
    //     cb(null,Date.now() + '-' + file.originalname);
    //   }
})

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload;