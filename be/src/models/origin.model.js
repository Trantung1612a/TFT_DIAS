const mongoose = require("mongoose");

const originSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    set: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    breakpoints: [
      {
        number: { type: Number, required: true },
        effect: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Origin", originSchema);
