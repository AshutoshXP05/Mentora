import User from "../model/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler ( async ( req, res, next ) => {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if ( !token ) {
            throw new ApiError(401, "Not authorized, no token");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if ( !decodedToken ) {
                throw new ApiError(401, "Not authorized, invalid token");
            }
             const user = await User.findById(decodedToken?._id).select("-password");

        if ( ! user ) {
            throw new ApiError(401, "Not authorized, user not found");
        }

        req.user = user;
        next();
    
})

export const requireEducator = asyncHandler( async ( req, res, next ) => {
    if ( req.user?.role !== "educator" ) {
        throw new ApiError(403, "Access denied. Only educators can perform this action.");
    }
    next();
});
