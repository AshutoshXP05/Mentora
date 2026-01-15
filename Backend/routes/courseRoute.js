import express from 'express'
import { verifyJwt } from '../middleware/auth.middleware.js';
import { createCourse, editCourse, getCourseById, getCreatorById, getCreatorCourses, getPublishedCourse, removeCourse } from '../controllers/courseController.js';
import upload from '../middleware/multer.js';

const courseRoute = express.Router();

courseRoute.post('/create', verifyJwt, upload.single("thumbnail"), createCourse);
courseRoute.get('/getpublished', getPublishedCourse);
courseRoute.get('/getcreator/:id', verifyJwt, getCreatorCourses);
courseRoute.post('/edit/:id', verifyJwt, upload.single("thumbnail"), editCourse);
courseRoute.get('/getcourse/:id', verifyJwt, getCourseById);
courseRoute.delete('/remove/:id', verifyJwt, removeCourse);
courseRoute.post('/creator', verifyJwt, getCreatorById);

export default courseRoute;