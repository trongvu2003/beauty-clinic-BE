const multer = require("multer");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../uploads/brands");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),

  filename: (req, file, cb) => {
    const unique =
      Date.now() +
      "-" +
      Math.random().toString(36).substring(2, 8) +
      "-" +
      file.originalname.replace(/\s+/g, "-");

    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only images allowed"), false);
  }

  cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
