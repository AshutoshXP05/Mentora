import uploadOnCloudinary from "../constants/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createLecture = asyncHandler(async (req, res) => {
    const { lectureTitle } = req.body;
    const { id } = req.params;
    if (!lectureTitle || !id) {
        throw new ApiError(400, "Lecture title is required");
    }

    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    if (String(course.creator) !== String(req.user._id)) {
        throw new ApiError(403, "Access denied. You can only add lectures to your own courses.");
    }

    const lecture = await Lecture.create({
        lectureTitle
    });
    
    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { $push: { lectures: lecture._id } },
        { new: true }
      ).populate("lectures");

    return res.status(201).json({ lecture, course: updatedCourse });
});

const getCourseLecture = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    // await course.populate("lectures");
    // await course.save();
    //  await Course.updateOne(
    //     { _id: course._id },
    //     { $push: { lectures: lecture._id } }
    // );
    await course.populate("lectures")
    return res.status(200).json(course);
});

const editLecture = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    const course = await Course.findOne({ lectures: lectureId });
    if (!course) {
        throw new ApiError(404, "Course containing this lecture not found");
    }
    if (String(course.creator) !== String(req.user._id)) {
        throw new ApiError(403, "Access denied. You can only edit lectures of your own courses.");
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }
    let videoUrl;
    if (req.file) {
        videoUrl = await uploadOnCloudinary(req.file.path);
        if (!videoUrl) {
            throw new ApiError(500, "Lecture video upload failed");
        }
        lecture.videoUrl = videoUrl;
    }
    if (lectureTitle) {
        lecture.lectureTitle = lectureTitle;
    }
    if (isPreviewFree !== undefined) {
        lecture.isPreviewFree = isPreviewFree === "true" || isPreviewFree === true;
    }

    await lecture.save();
    return res.status(200).json(lecture);
});

const removeLecture = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;

    const course = await Course.findOne({ lectures: lectureId });
    if (!course) {
        throw new ApiError(404, "Course containing this lecture not found");
    }
    if (String(course.creator) !== String(req.user._id)) {
        throw new ApiError(403, "Access denied. You can only delete lectures of your own courses.");
    }

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }
    await Course.updateOne(
        { _id: course._id },
        { $pull: { lectures: lectureId } }
    )
    return res.status(200).json({ message: "Lecture deleted successfully" })
});

export { createLecture, getCourseLecture, editLecture, removeLecture };