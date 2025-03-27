const multer = require("multer");
const path = require("path");

// Multer configuration for handling image uploads
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // Check file type
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"));
  },
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});