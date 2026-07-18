const express = require("express");
const multer  = require("multer");
const { uploadChampionImage } = require("../controller/upload.controller");

const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Chỉ chấp nhận file ảnh"));
  },
});

const router = express.Router();
router.post("/champion", upload.single("image"), uploadChampionImage);

module.exports = router;
