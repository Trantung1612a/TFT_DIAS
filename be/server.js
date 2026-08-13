require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { connectDB } = require("./src/config/db");
const { swaggerUi, swaggerSpec } = require("./src/config/swagger");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Verify Cloudinary (auto-configured via CLOUDINARY_URL in .env)
require("cloudinary").v2.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected"))
  .catch((e) => console.error("❌ Cloudinary error:", e?.error?.message || e.message));

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman) or matching allowed origins
    if (!origin || allowedOrigins.some((o) => origin.startsWith(o))) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth",      require("./src/routes/auth.route"));
app.use("/api/champions", require("./src/routes/champion.route"));
app.use("/api/origins",   require("./src/routes/origin.route"));
app.use("/api/classes",   require("./src/routes/class.route"));
app.use("/api/upload",    require("./src/routes/upload.route"));

// Health check
app.get("/", (req, res) => res.json({ message: "TFT DIAS API is running" }));

// Error handler
app.use(require("./src/middleware/error.middleware"));

// Only bind port when running directly (not imported by Vercel serverless)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
