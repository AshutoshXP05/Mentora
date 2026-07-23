import User from "../model/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import genToken from "../constants/token.js";
import validator from "validator";
import sendMail from "../constants/sendMail.js";

const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true" || process.env.NODE_ENV !== "development";

const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    ...(maxAge ? { maxAge } : {}),
});

const signUp = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        throw new ApiError(400, "All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email");
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exists");
    }

    const newUser = await User.create({
        name, email, password, role
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    const token = await genToken(newUser._id)
    res.cookie("token", token, getCookieOptions(7 * 24 * 60 * 60 * 1000));

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "User created successfully")
        )
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect Password");
    }

    const token = await genToken(user._id);
    res.cookie("token", token, getCookieOptions(7 * 24 * 60 * 60 * 1000));

    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, loggedInUser, "User logged in successfully")
        )
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", getCookieOptions());
    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "User logged out successfully")
        )
});

const sendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "Invalid Email");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; 
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp); 

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "OTP sent to email")
        )

});

const verifyOTP = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "Invalid Email");
    }

    if ( user.otpExpires < Date.now()) {
        throw new ApiError(404, "OTP Expired. Please request a new OTP");
    }

    if ( user.resetOtp != otp ) {
        throw new ApiError(404, "Invalid OTP");
    }

    user.isOtpVerified = true;
    user.otpVerifiedExpires = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "OTP verified successfully")
        )

});

const resetPassword = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified || !user.otpVerifiedExpires || user.otpVerifiedExpires < Date.now()) {
        return res.status(400).json(
            new ApiResponse(400, null, "OTP verification is required or has expired")
        )
    }

    user.password = password;
    user.isOtpVerified = false;
    user.otpVerifiedExpires = undefined;

    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Password reset successfully")
        )

});

const googleAuth = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      role: role || "student",
      password: Math.random().toString(36).slice(-8), // dummy password
    });
  }

  const token = await genToken(user._id);

  res.cookie("token", token, getCookieOptions(24 * 60 * 60 * 1000));

  const createdUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Google authentication successful"));
});

export {
    signUp,
    loginUser, 
    logoutUser,
    sendOTP,
    verifyOTP,
    resetPassword,
    googleAuth
};