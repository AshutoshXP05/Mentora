import User from "../model/userModel.js"
import { ApiError } from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../constants/cloudinary.js"

const getCurrentUser = asyncHandler( async ( req, res) => { 
    const user = await User.findById(req.user._id).select("-password").populate("enrolledCourses");
    if ( ! user ) {
        throw new ApiError(404, "User not found")
    }
    return res.status(200).json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { description, name } = req.body;
    let photoUrl;

    if (req.file) {
        photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const updateData = { name, description };
    if (photoUrl) updateData.photoUrl = photoUrl;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({ message: "Profile updated successfully", user });
});


export { getCurrentUser , updateProfile}