import React, { createContext, useContext, useState } from 'react';
import { initialStudentsList, teacherInfo } from '../data/mockData';

const AcademicContext = createContext();

export function AcademicProvider({ children }) {
  const [students, setStudents] = useState(initialStudentsList);
  const [currentStudentId, setCurrentStudentId] = useState('STU-2023-084');
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
  const [notificationMessage, setNotificationMessage] = useState(null);

  // Active student object getter
  const currentStudent = students.find((s) => s.id === currentStudentId) || students[0];

  // Show quick toast/notification message
  const triggerNotification = (msg) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  // Recalculate student metrics & risk profile dynamically
  const updateStudentAcademicRecord = (studentId, updatedFields) => {
    setStudents((prevStudents) =>
      prevStudents.map((stu) => {
        if (stu.id !== studentId) return stu;

        // Clone subjects
        const subjects = (updatedFields.subjects || stu.subjects).map((sub) => {
          const assignmentScore = Number(sub.assignmentScore);
          const recentExams = sub.recentExams || [];
          const examSum = recentExams.reduce((acc, ex) => acc + Number(ex.score), 0);
          const examScore = recentExams.length ? Math.round(examSum / recentExams.length) : Number(sub.examScore || 0);

          // Combined Subject Score (40% Assignment + 60% Exam)
          const score = Math.min(100, Math.max(0, Math.round(0.4 * assignmentScore + 0.6 * examScore)));

          let status = 'Good';
          let color = '#f59e0b';
          let grade = 'B+';

          if (score >= 90) {
            status = 'Strong'; color = '#10b981'; grade = 'S';
          } else if (score >= 80) {
            status = 'Strong'; color = '#10b981'; grade = 'A';
          } else if (score >= 70) {
            status = 'Good'; color = '#6366f1'; grade = 'B+';
          } else if (score >= 60) {
            status = 'Moderate'; color = '#f59e0b'; grade = 'C+';
          } else {
            status = 'Weak'; color = '#ef4444'; grade = 'U';
          }

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

        // Attendance calculations
        const attendanceClassesPresent = Number(updatedFields.attendanceClassesPresent ?? stu.metrics.attendanceClassesPresent);
        const attendanceTotalClasses = Number(updatedFields.attendanceTotalClasses ?? stu.metrics.attendanceTotalClasses);
        const attendance = Math.min(100, Math.round((attendanceClassesPresent / attendanceTotalClasses) * 100));

        // Aggregate Metrics
        const assignmentAverage = Math.round(
          subjects.reduce((acc, s) => acc + s.assignmentScore, 0) / subjects.length
        );
        const examinationAverage = Math.round(
          subjects.reduce((acc, s) => acc + s.examScore, 0) / subjects.length
        );
        const overallPerformance = Math.round(
          subjects.reduce((acc, s) => acc + s.score, 0) / subjects.length
        );
        const gpaVal = (overallPerformance / 10).toFixed(1);
        const gpa = `${gpaVal} / 10`;

        // Dynamic Academic Risk Assessment
        const weakSubjects = subjects.filter((s) => s.score < 60);
        const factors = [];
        let riskScore = 0;

        if (attendance < 85) {
          riskScore += 35;
          factors.push({
            factor: 'Overall Attendance',
            value: `${attendance}%`,
            status: attendance < 75 ? 'Critical' : 'Warning',
            description: `${85 - attendance}% below 85% exam clearance requirement`,
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

        if (examinationAverage < assignmentAverage - 5) {
          riskScore += 15;
          factors.push({
            factor: 'Exam vs Assignment Gap',
            value: `-${assignmentAverage - examinationAverage}%`,
            status: 'Moderate',
            description: 'Exam performance lags internal assignment score',
            impact: 'Low',
          });
        }

        let level = 'Low';
        if (riskScore >= 50) level = 'High';
        else if (riskScore >= 25) level = 'Medium';

        let primaryFactor = 'Satisfactory overall academic progress';
        if (weakSubjects.length > 0 && attendance < 85) {
          primaryFactor = `${weakSubjects[0].name} score below 60% & Attendance below 85% requirement`;
        } else if (weakSubjects.length > 0) {
          primaryFactor = `${weakSubjects[0].name} score below 60% threshold`;
        } else if (attendance < 85) {
          primaryFactor = `Attendance (${attendance}%) below mandatory 85% clearance mark`;
        }

        const summary = `${stu.name}'s current overall score is ${overallPerformance}% with ${attendance}% attendance. ${
          level === 'High'
            ? 'Immediate academic intervention is recommended.'
            : level === 'Medium'
            ? 'Monitored academic support is advised.'
            : 'Academic performance is stable.'
        }`;

        return {
          ...stu,
          metrics: {
            ...stu.metrics,
            attendance,
            attendanceClassesPresent,
            attendanceTotalClasses,
            assignmentAverage,
            examinationAverage,
            overallPerformance,
            gpa,
          },
          academicRisk: {
            level,
            score: Math.min(100, riskScore),
            primaryFactor,
            summary,
            factors: factors.length ? factors : [
              {
                factor: 'Overall Academic Progress',
                value: `${overallPerformance}%`,
                status: 'Excellent',
                description: 'Meets all course requirements',
                impact: 'None',
              },
            ],
          },
          subjects,
        };
      })
    );

    triggerNotification(`Academic record successfully updated for ${studentId}!`);
  };

  return (
    <AcademicContext.Provider
      value={{
        students,
        currentStudent,
        currentStudentId,
        setCurrentStudentId,
        role,
        setRole,
        teacherInfo,
        updateStudentAcademicRecord,
        notificationMessage,
        triggerNotification,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
}
