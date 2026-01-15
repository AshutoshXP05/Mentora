import Course from "../model/courseModel.js";
import Review from "../model/reviewModel.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createReview = asyncHandler ( async ( req, res) => {
    const {rating, comment, id} = req.body;
    const userId = req.user._id;
    const course = await Course.findById(id);
    if ( ! course ) {
        throw new ApiError ( 404, "Course not found");
    }
    const alreadyReviewed = await Review.findOne ( { course: id, user: userId } );
    if ( alreadyReviewed ) {
        throw new ApiError ( 400, "You have already reviewed this course");
    }
    const review = await new Review ({
        course: id,
        user: userId,
        rating,
        comment
    });
    await review.save();
    await Course.updateOne(
  { _id: id },
  { $push: { reviews: review._id } }
);
    return res.status(201).json( { message: "Review added successfully", review } );
});

const getReviews = asyncHandler ( async ( req, res) => {
    const reviews = await Review.find().populate("course user").sort({reviewedAt: -1});
    return res.status( 200 ).json ( reviews);
});


export { createReview, getReviews };