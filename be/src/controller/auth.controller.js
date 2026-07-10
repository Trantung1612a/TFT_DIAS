const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt.util");
const { sendOTP } = require("../utils/email.util");
const { sendSuccess, sendError } = require("../utils/response.util");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return sendError(res, "Email already registered", 400);

    const user = await User.create({ fullName, email, password });
    const token = generateToken({ id: user._id, role: user.role });
    return sendSuccess(res, { token, user: { id: user._id, fullName, email, role: user.role } }, "Registered successfully", 201);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, "Invalid email or password", 401);
    }
    const token = generateToken({ id: user._id, role: user.role });
    return sendSuccess(res, { token, user: { id: user._id, fullName: user.fullName, email, role: user.role } }, "Login successful");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const sendOTPHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Email not found", 404);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await sendOTP(email, otp);
    return sendSuccess(res, null, "OTP sent to email");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpiry: { $gt: new Date() } });
    if (!user) return sendError(res, "Invalid or expired OTP", 400);

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return sendSuccess(res, null, "OTP verified successfully");
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getProfile = async (req, res) => {
  return sendSuccess(res, req.user, "Profile fetched");
};

module.exports = { register, login, sendOTPHandler, verifyOTP, getProfile };
 