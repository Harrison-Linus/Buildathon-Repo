import supabase from '../config/supabase.js';
import { fallbackStudents } from '../data/fallbackData.js';

let localMemoryStudents = [...fallbackStudents];

// GET /api/students - List all students
export const getAllStudents = async (req, res) => {
  try {
    if (supabase) {
      const { data: students, error } = await supabase.from('students').select('*');
      if (!error && students && students.length > 0) {
        // Also fetch subjects for each student
        const formattedStudents = await Promise.all(
          students.map(async (stu) => {
            const { data: subs } = await supabase.from('subjects').select('*').eq('student_id', stu.id);
            return {
              ...stu,
              subjects: subs || [],
            };
          })
        );
        return res.json({ success: true, source: 'supabase', data: formattedStudents });
      }
    }
    return res.json({ success: true, source: 'fallback', data: localMemoryStudents });
  } catch (err) {
    console.error('Error fetching students:', err);
    return res.status(500).json({ success: false, error: err.message, data: localMemoryStudents });
  }
};

// GET /api/students/:id - Fetch single student details
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    if (supabase) {
      const { data: student, error } = await supabase.from('students').select('*').eq('id', id).single();
      if (!error && student) {
        const { data: subs } = await supabase.from('subjects').select('*').eq('student_id', id);
        return res.json({
          success: true,
          source: 'supabase',
          data: { ...student, subjects: subs || [] },
        });
      }
    }
    const local = localMemoryStudents.find((s) => s.id === id) || localMemoryStudents[0];
    return res.json({ success: true, source: 'fallback', data: local });
  } catch (err) {
    console.error(`Error fetching student ${id}:`, err);
    const local = localMemoryStudents.find((s) => s.id === id) || localMemoryStudents[0];
    return res.json({ success: true, source: 'fallback', data: local });
  }
};

// PUT /api/students/:id/academic-record - Update student academic details & recalculate risk
export const updateStudentAcademicRecord = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body; // e.g., { subjects, attendanceClassesPresent, attendanceTotalClasses }

  try {
    // 1. Process in memory/local
    let targetIndex = localMemoryStudents.findIndex((s) => s.id === id);
    if (targetIndex === -1) targetIndex = 0;
    const stu = localMemoryStudents[targetIndex];

    const subjects = (updatedFields.subjects || stu.subjects).map((sub) => {
      const assignmentScore = Number(sub.assignmentScore);
      const recentExams = sub.recentExams || [];
      const examSum = recentExams.reduce((acc, ex) => acc + Number(ex.score), 0);
      const examScore = recentExams.length ? Math.round(examSum / recentExams.length) : Number(sub.examScore || 0);

      const score = Math.min(100, Math.max(0, Math.round(0.4 * assignmentScore + 0.6 * examScore)));
      let status = 'Good';
      let color = '#f59e0b';
      let grade = 'B+';

      if (score >= 90) { status = 'Strong'; color = '#10b981'; grade = 'S'; }
      else if (score >= 80) { status = 'Strong'; color = '#10b981'; grade = 'A'; }
      else if (score >= 70) { status = 'Good'; color = '#6366f1'; grade = 'B+'; }
      else if (score >= 60) { status = 'Moderate'; color = '#f59e0b'; grade = 'C+'; }
      else { status = 'Weak'; color = '#ef4444'; grade = 'U'; }

      return {
        ...sub,
        assignmentScore,
        examScore,
        score,
        status,
        color,
        grade,
        recentExams,
      };
    });

    const attendanceClassesPresent = Number(updatedFields.attendanceClassesPresent ?? stu.metrics.attendanceClassesPresent);
    const attendanceTotalClasses = Number(updatedFields.attendanceTotalClasses ?? stu.metrics.attendanceTotalClasses);
    const attendance = Math.min(100, Math.round((attendanceClassesPresent / attendanceTotalClasses) * 100));

    const assignmentAverage = Math.round(subjects.reduce((acc, s) => acc + s.assignmentScore, 0) / subjects.length);
    const examinationAverage = Math.round(subjects.reduce((acc, s) => acc + s.examScore, 0) / subjects.length);
    const overallPerformance = Math.round(subjects.reduce((acc, s) => acc + s.score, 0) / subjects.length);
    const gpaVal = (overallPerformance / 10).toFixed(1);

    const weakSubjects = subjects.filter((s) => s.score < 60);
    const factors = [];
    let riskScore = 0;

    if (attendance < 85) {
      riskScore += 35;
      factors.push({
        factor: 'Overall Attendance',
        value: `${attendance}%`,
        status: attendance < 75 ? 'Critical' : 'Warning',
        description: `${85 - attendance}% below 85% requirement`,
        impact: attendance < 75 ? 'High' : 'Medium',
      });
    }

    weakSubjects.forEach((sub) => {
      riskScore += 25;
      factors.push({
        factor: `${sub.name} Score`,
        value: `${sub.score}%`,
        status: 'Warning',
        description: `Score below course threshold of 60%`,
        impact: 'High',
      });
    });

    let level = 'Low';
    if (riskScore >= 50) level = 'High';
    else if (riskScore >= 25) level = 'Medium';

    let primaryFactor = 'Satisfactory overall progress';
    if (weakSubjects.length > 0 && attendance < 85) {
      primaryFactor = `${weakSubjects[0].name} below 60% & Attendance below 85%`;
    } else if (weakSubjects.length > 0) {
      primaryFactor = `${weakSubjects[0].name} below 60% threshold`;
    } else if (attendance < 85) {
      primaryFactor = `Attendance (${attendance}%) below mandatory 85% mark`;
    }

    const updatedStudent = {
      ...stu,
      metrics: {
        ...stu.metrics,
        attendance,
        attendanceClassesPresent,
        attendanceTotalClasses,
        assignmentAverage,
        examinationAverage,
        overallPerformance,
        gpa: `${gpaVal} / 10`,
      },
      academicRisk: {
        level,
        score: Math.min(100, riskScore),
        primaryFactor,
        summary: `${stu.name}'s overall score is ${overallPerformance}% with ${attendance}% attendance.`,
        factors: factors.length ? factors : [
          { factor: 'Overall Academic Progress', value: `${overallPerformance}%`, status: 'Excellent', description: 'Meets requirements', impact: 'None' }
        ],
      },
      subjects,
    };

    localMemoryStudents[targetIndex] = updatedStudent;

    // 2. Sync to Supabase if configured
    if (supabase) {
      await supabase.from('students').update({
        metrics: updatedStudent.metrics,
        academic_risk: updatedStudent.academicRisk,
      }).eq('id', id);

      for (const sub of subjects) {
        if (sub.id && typeof sub.id === 'number') {
          await supabase.from('subjects').update({
            assignment_score: sub.assignmentScore,
            exam_score: sub.examScore,
            score: sub.score,
            status: sub.status,
            color: sub.color,
            grade: sub.grade,
            recent_exams: sub.recentExams,
          }).eq('id', sub.id);
        }
      }
    }

    return res.json({
      success: true,
      message: `Academic record successfully updated for student ${id}`,
      data: updatedStudent,
    });
  } catch (err) {
    console.error(`Error updating student record ${id}:`, err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
