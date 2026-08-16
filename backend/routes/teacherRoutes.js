import express from 'express';
import { getTeacherProfile } from '../controllers/teacherController.js';

const router = express.Router();

router.get('/profile', getTeacherProfile);

export default router;
