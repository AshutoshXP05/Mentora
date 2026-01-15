import express from "express";
import { googleAuth, loginUser, logoutUser, resetPassword, sendOTP, signUp, verifyOTP } from "../controllers/authController.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", loginUser);
authRoute.get("/logout", verifyJwt, logoutUser);

authRoute.post("/sendotp", sendOTP);
authRoute.post("/verifyotp", verifyOTP);
authRoute.post("/resetpassword", resetPassword);

authRoute.post("/googleauth", googleAuth);

export default authRoute;