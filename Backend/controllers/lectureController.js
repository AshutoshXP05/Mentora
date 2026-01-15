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

    const course = await Course.findById(id).populate("lectures");
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    const lecture = await Lecture.create({
        lectureTitle
    })
    await Course.updateOne(
        { _id: course._id },
        { $push: { lectures: lecture._id } }
    );
    await course.populate("lectures")
    return res.status(201).json({ lecture, course });
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
    if (typeof isPreviewFree === "boolean") {
        lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();
    return res.status(200).json(lecture);
});

const removeLecture = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }
    await Course.updateMany(
        { lectures: lectureId },
        { $pull: { lectures: lectureId } }
    )
    return res.status(200).json({ message: "Lecture deleted successfully" })
});

export { createLecture, getCourseLecture, editLecture, removeLecture };