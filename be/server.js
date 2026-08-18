require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./src/config/passport"); // ← load strategies (Google, Facebook)
const { connectDB } = require("./src/config/db");
const { swaggerUi, swaggerSpec } = require("./src/config/swagger");

const app = express();
const PORT = process.env.PORT || 5000;

// ── 1. Database ───────────────────────────────────────────────────────────────
connectDB();

// ── 2. Cloudinary health check ────────────────────────────────────────────────
require("cloudinary").v2.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected"))
  .catch((e) => console.error("❌ Cloudinary error:", e?.error?.message || e.message));

// ── 3. CORS (must be FIRST middleware, before body parsers) ───────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // curl, Postman, server-to-server
  if (allowedOrigins.some((o) => origin.startsWith(o))) return true;
  if (/^https:\/\/tft-dias-frontend[\w-]*\.vercel\.app$/.test(origin)) return true;
  // Allow any localhost port in dev (Vite auto-increments: 5173, 5174, ...)
  if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) return true;
  return false;
};

app.use(cors({
  origin: (origin, cb) => {
    if (isAllowedOrigin(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// ── 4. Body parsers ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── 5. Passport (after body parsers) ─────────────────────────────────────────
app.use(passport.initialize());

// ── 6. Swagger docs ───────────────────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── 7. Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth",      require("./src/routes/auth.route"));
app.use("/api/champions", require("./src/routes/champion.route"));
app.use("/api/origins",   require("./src/routes/origin.route"));
app.use("/api/classes",   require("./src/routes/class.route"));
app.use("/api/upload",    require("./src/routes/upload.route"));

// ── 8. Health check ───────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "TFT DIAS API is running" }));

// ── 9. Global error handler (must be LAST) ────────────────────────────────────
app.use(require("./src/middleware/error.middleware"));

// ── 10. Start server (skipped when imported by Vercel serverless) ─────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
