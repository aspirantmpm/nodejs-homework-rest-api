const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newName = `${uniquePrefix}_${file.originalname}`;
        cb(null, newName);
    }
});

const limits = {
    fileSize: 1024 * 1024
};

const fileFilter = (req, file, cb) => {
    console.log.apply(file);
    cb(null, true);
};

const upload = multer({
    storage, limits, fileFilter,
});

module.exports = upload;