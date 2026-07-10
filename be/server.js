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

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth",      require("./src/routes/auth.route"));
app.use("/api/champions", require("./src/routes/champion.route"));

// Health check
app.get("/", (req, res) => res.json({ message: "TFT DIAS API is running" }));

// Error handler
app.use(require("./src/middleware/error.middleware"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
