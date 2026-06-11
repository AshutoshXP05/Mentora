import uploadOnCloudinary from "../constants/cloudinary.js";
import Course from "../model/courseModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../model/userModel.js";


const createCourse = asyncHandler(async (req, res) => {
    const { title, category } = req.body;
    if (!title || !category) {
        throw new ApiError(400, "Title and Category are required to create a course");
    } 

    let thumbnail;
    if (req.file) {
        thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const course = await Course.create({
        title,
        category,
        description: req.body.description || "",
        creator: req.user._id,
        price: req.body.price ? Number(req.body.price) : 0,
        thumbnail,
    });
    return res.status(201).json(
        new ApiResponse(201, course, "Course created successfully")
    )
});

const getPublishedCourse = asyncHandler(async (req, res) => {
    // const courses = await Course.find({ isPublished: true });
    const courses = await Course.find({ isPublished: true }).populate("lectures");
    // Don't throw error if no courses found - just return empty array
    return res.status(200).json(
        new ApiResponse(200, courses, "Published courses retrieved successfully")
    )
});
 
const getCreatorCourses = asyncHandler(async (req, res) => {
    const { id } = req.params
    const loogedInUser = req.user._id;
    if (id != String(loogedInUser)) {
        throw new ApiError(403, "Access denied. You can only access your own courses.");
    }
    const course = await Course.find({ creator: id });
    if (course.length === 0) {
        throw new ApiError(404, "No courses found for this creator");
    }
    return res.status(200).json(
        new ApiResponse(200, course, "Creator's courses retrieved successfully")
    )
});

const editCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    if (String(course.creator) !== String(req.user._id)) {
        throw new ApiError(403, "Access denied. You can only edit your own courses.");
    }

    const { title, subTitle, description, category, price, level, isPublished } = req.body;

    let thumbnail;
    if (req.file) {
        thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const updateData = { title, subTitle, description, category, price: price ? Number(price) : 0, level, isPublished };
    if (thumbnail) {
        updateData.thumbnail = thumbnail;
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedCourse) {
        throw new ApiError(500, "Failed to update course");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedCourse, "Course updated successfully")
    )
});

const getCourseById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let course = await Course.findById(id)
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    return res.status(200).json(
        new ApiResponse(200, course, "Course retrieved successfully")
    )

})

const removeCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let course = await Course.findById(id);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    if (String(course.creator) !== String(req.user._id)) {
        throw new ApiError(403, "Access denied. You can only delete your own courses.");
    }
    course = await Course.findByIdAndDelete(id, { new: true });

    return res.status(200).json(
        new ApiResponse(200, null, "Course deleted successfully")
    )
})

const getCreatorById = asyncHandler ( async ( req, res) => {
    const {userId} = req.body
    const user = await User.findById(userId).select("-password ");
    if ( !user ) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(user);
})

export {
    createCourse, getPublishedCourse, getCreatorCourses,
    editCourse, getCourseById, removeCourse, getCreatorById
};