import express from 'express';
import {
  getAllStudents,
  getStudentById,
  updateStudentAcademicRecord,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id/academic-record', updateStudentAcademicRecord);

export default router;
