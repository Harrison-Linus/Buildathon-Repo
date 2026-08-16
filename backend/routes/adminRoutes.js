import express from 'express';
import { getAdminAnalytics, getAdminReports } from '../controllers/adminController.js';

const router = express.Router();

router.get('/analytics', getAdminAnalytics);
router.get('/reports', getAdminReports);

export default router;
