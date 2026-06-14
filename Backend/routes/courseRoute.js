import express from 'express'
import { verifyJwt, requireEducator } from '../middleware/auth.middleware.js';
import { createCourse, editCourse, getCourseById, getCreatorById, getCreatorCourses, getPublishedCourse, removeCourse } from '../controllers/courseController.js';
import upload from '../middleware/multer.js';

const courseRoute = express.Router();

courseRoute.post('/create', verifyJwt, requireEducator, upload.single("thumbnail"), createCourse);
courseRoute.get('/getpublished', getPublishedCourse);
courseRoute.get('/getcreator/:id', verifyJwt, requireEducator, getCreatorCourses);
courseRoute.post('/edit/:id', verifyJwt, requireEducator, upload.single("thumbnail"), editCourse);
courseRoute.get('/getcourse/:id', verifyJwt, getCourseById);
courseRoute.delete('/remove/:id', verifyJwt, requireEducator, removeCourse);
courseRoute.post('/creator', verifyJwt, getCreatorById);

export default courseRoute;