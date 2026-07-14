require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const PREFIX = process.argv[2] || "champion";
const MAX    = parseInt(process.argv[3]) || 500;

(async () => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: PREFIX + "/",
      max_results: MAX,
    });

    const list = result.resources.map((item) => ({
      name:      item.public_id.split("/").pop(),
      public_id: item.public_id,
      url:       item.secure_url,
    }));

    const outPath = path.join(__dirname, `../data/${PREFIX}_assets.json`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(list, null, 2), "utf8");

    console.log(`✅ Lấy được ${list.length} ảnh từ folder "${PREFIX}/"`);
    console.log(`📄 Đã lưu vào: ${outPath}`);
    console.log("\nDanh sách:");
    list.forEach((c) => console.log(`  ${c.name.padEnd(25)} → ${c.public_id}`));
  } catch (e) {
    console.error("❌ Lỗi:", e?.error?.message || e.message);
  }
})();
