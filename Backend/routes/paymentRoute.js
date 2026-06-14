import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { RazorPayOrder, verifyPayment } from "../controllers/orderController.js";

const paymentRoute = express.Router();

paymentRoute.post("/razorpay-order", verifyJwt, RazorPayOrder);
paymentRoute.post("/verifypayment", verifyJwt, verifyPayment);


export default paymentRoute;