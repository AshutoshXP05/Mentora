import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const genToken = async (userid ) => {
    try {
        const token = jwt.sign(
            {_id: userid},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRY} 
    )

    return token;
    } 
    catch (error) {
        throw new ApiError(500, "Token generation failed");
    }
}

export default genToken;