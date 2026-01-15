
import express from 'express';
import { verifyJwt } from '../middleware/auth.middleware.js';
import { getCurrentUser } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import { updateProfile } from '../controllers/userController.js';   

const userRoute = express.Router();

userRoute.get('/getCurrentUser', verifyJwt, getCurrentUser );
userRoute.post('/updateProfile', verifyJwt, upload.single("photoUrl"), updateProfile );

export default userRoute;