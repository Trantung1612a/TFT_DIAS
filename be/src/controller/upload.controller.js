const cloudinary = require("cloudinary").v2;

const uploadChampionImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Không có file nào được gửi lên" });

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "tft/champions", resource_type: "image" },
        (err, data) => (err ? reject(err) : resolve(data))
      );
      stream.end(req.file.buffer);
    });

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: err.message || "Upload thất bại" });
  }
};

module.exports = { uploadChampionImage };
