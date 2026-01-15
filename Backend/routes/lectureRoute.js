

import express from 'express';
import { verifyJwt } from "../middleware/auth.middleware.js";
import { createLecture, editLecture, getCourseLecture, removeLecture } from "../controllers/lectureController.js";
import upload from "../middleware/multer.js";

const lectureRoute = express.Router();

lectureRoute.post('/createlecture/:id', verifyJwt, createLecture);
lectureRoute.get('/courselecture/:id',verifyJwt, getCourseLecture);
lectureRoute.post('/editlecture/:lectureId', verifyJwt, upload.single("videoUrl"), editLecture);
lectureRoute.delete('/removelecture/:lectureId', verifyJwt,  removeLecture);

export default lectureRoute;