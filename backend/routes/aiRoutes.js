import express from 'express';
import { getStudentAiAnalysis } from '../controllers/aiController.js';

const router = express.Router();

router.get('/student/:studentId', getStudentAiAnalysis);

export default router;
