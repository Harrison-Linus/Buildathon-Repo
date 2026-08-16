import { fallbackStudents } from '../data/fallbackData.js';

// GET /api/admin/analytics
export const getAdminAnalytics = async (req, res) => {
  return res.json({
    success: true,
    data: {
      totalStudents: 68,
      totalTeachers: 12,
      totalCourses: 16,
      averageClassAttendance: 86,
      overallPassPercentage: 92,
      atRiskCount: 4,
      departmentPerformance: [
        { department: 'Computer Science', passPercentage: 94, avgGpa: 8.4 },
        { department: 'Electronics & Comm.', passPercentage: 88, avgGpa: 7.9 },
        { department: 'Information Tech.', passPercentage: 91, avgGpa: 8.1 },
        { department: 'Mechanical Eng.', passPercentage: 85, avgGpa: 7.5 },
      ],
    },
  });
};

// GET /api/admin/reports
export const getAdminReports = async (req, res) => {
  return res.json({
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      students: fallbackStudents,
      summary: 'Semester 6 Academic Monitoring Summary Report',
    },
  });
};
