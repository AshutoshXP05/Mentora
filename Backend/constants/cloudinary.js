import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLODINARY_API_SECRET,
    });


    try {
        if (!filePath) {
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        // auto because we will upload video as well as image 
        return uploadResult.secure_url;
    }

    catch (error) {

        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
    finally {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file from local storage if it exists
        }
    }

}

export default uploadOnCloudinary;