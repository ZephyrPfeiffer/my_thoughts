const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".jfif") {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  },
});