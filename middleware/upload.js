const multer = require("multer");
const path = require("path");

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  },
});

// Filter for image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed"), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Max file size: 5MB
  },
  fileFilter: fileFilter,
});

module.exports = upload;
