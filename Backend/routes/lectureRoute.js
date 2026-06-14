

import express from 'express';
import { verifyJwt, requireEducator } from "../middleware/auth.middleware.js";
import { createLecture, editLecture, getCourseLecture, removeLecture } from "../controllers/lectureController.js";
import upload from "../middleware/multer.js";

const lectureRoute = express.Router();

lectureRoute.post('/createlecture/:id', verifyJwt, requireEducator, createLecture);
lectureRoute.get('/courselecture/:id', verifyJwt, getCourseLecture);
lectureRoute.post('/editlecture/:lectureId', verifyJwt, requireEducator, upload.single("videoUrl"), editLecture);
lectureRoute.delete('/removelecture/:lectureId', verifyJwt, requireEducator, removeLecture);

export default lectureRoute;