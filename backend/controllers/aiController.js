import { analyzeStudentAcademicProfile } from '../services/aiEngine.js';
import { fallbackStudents } from '../data/fallbackData.js';
import supabase from '../config/supabase.js';

// GET /api/ai/student/:studentId
export const getStudentAiAnalysis = async (req, res) => {
  const { studentId } = req.params;

  try {
    let student = null;
    let subjects = [];

    if (supabase) {
      const { data: dbStudent } = await supabase.from('students').select('*').eq('id', studentId).single();
      if (dbStudent) {
        student = dbStudent;
        const { data: dbSubjects } = await supabase.from('subjects').select('*').eq('student_id', studentId);
        subjects = dbSubjects || [];
      }
    }

    if (!student) {
      student = fallbackStudents.find((s) => s.id === studentId) || fallbackStudents[0];
      subjects = student.subjects || [];
    }

    const aiReport = analyzeStudentAcademicProfile(student, subjects);

    return res.json({
      success: true,
      data: aiReport,
    });
  } catch (err) {
    console.error(`AI Analysis error for ${studentId}:`, err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
