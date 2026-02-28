const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
});

const fileFilter = (_, file, cb) =>
  cb(null, /\.(jpe?g|png|webp|svg)$/i.test(path.extname(file.originalname)));

module.exports = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
