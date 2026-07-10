// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, select: false },
//     phone: { type: String, trim: true },
//     avatar: { type: String },
//     role: {
//       type: String,
//       enum: ["system_admin", "school_admin", "teacher", "student", "nurse", "kitchen"],
//       default: "student",
//     },
//     googleId: { type: String },
//     facebookId: { type: String },
//     isActive: { type: Boolean, default: true },
//     otp: { type: String },
//     otpExpiry: { type: Date },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password") || !this.password) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);
