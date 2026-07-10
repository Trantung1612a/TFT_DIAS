const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    set: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tiers: [
      {
        number: { type: Number, required: true },
        effect: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
