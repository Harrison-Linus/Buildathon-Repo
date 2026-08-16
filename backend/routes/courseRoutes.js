import express from 'express';
import { getAllCourses, getCourseById, enrollStudentInCourse } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/enroll', enrollStudentInCourse);

export default router;
