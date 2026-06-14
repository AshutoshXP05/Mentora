import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createReview", verifyJwt, createReview);
router.get("/getReviews", getReviews);

export default router;
