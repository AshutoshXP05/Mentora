import razorpay from "razorpay";
import dotenv from "dotenv";
import asyncHandler from "../utils/asyncHandler.js";
import Course from "../model/courseModel.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../model/userModel.js";
dotenv.config();

const RazorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const RazorPayOrder = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    if (req.user.role === "educator") {
        throw new ApiError(400, "Educators cannot purchase courses");
    }
    const options = {
        amount: course.price * 100,
        currency: "INR",
        receipt: `${id}.toString()`
    }
    const order = await RazorPayInstance.orders.create(options);
    return res.status(200).json(order);
});

const verifyPayment = asyncHandler(async (req, res) => {
    const { id, razorpay_order_id } = req.body;
    const userId = req.user._id;
    const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
        const expectedReceipt = `${id}.toString()`;
        if (orderInfo.receipt !== expectedReceipt) {
            throw new ApiError(400, "Invalid payment order receipt for this course");
        }

        const user = await User.findById(userId);
        if (!user.enrolledCourses.includes(id)) {
            await User.updateOne(
                { _id: userId },
                { $addToSet: { enrolledCourses: id } }
            );
        }
        const course = await Course.findById(id).populate("lectures");
        if (!course.enrolledStudent.includes(userId)) {
            await Course.updateOne(
                { _id: id },
                { $addToSet: { enrolledStudent: userId } }
            );
        }
        
        const updatedUser = await User.findById(userId).select("-password").populate("enrolledCourses");
        return res.status(200).json({
            message: "Payment verified and enrollment successful",
            user: updatedUser
        });
    }
    else {
        return res.status(400).json({message: "Payment failed"});
    }
});

export { RazorPayOrder, verifyPayment };