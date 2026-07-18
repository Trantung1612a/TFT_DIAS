const mongoose = require("mongoose");

const championSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    set: { type: String, required: true, trim: true },
    cost: { type: Number, min: 1, max: 5 },
    items: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
      validate: {
        validator: (arr) => arr.length <= 3,
        message: "A champion can hold at most 3 items",
      },
    },
    ability: {
      name: { type: String, trim: true },
      type: { type: String, enum: ["active", "passive"], default: "active" },
      description: { type: String, trim: true },
    },
    base_image_id: { type: String, required: true, trim: true },
    slot: { type: Number, min: 1 },
    origins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Origin" }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  },
  { timestamps: true }
);  

module.exports = mongoose.model("Champion", championSchema);
