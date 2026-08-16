import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudentsList, teacherInfo } from '../data/mockData';

const AcademicContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

export function AcademicProvider({ children }) {
  const [students, setStudents] = useState(initialStudentsList);
  const [currentStudentId, setCurrentStudentId] = useState('STU-2023-084');
  
  // Auth State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('auth_token');
  });
  const [role, setRole] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser).role : null;
  }); // 'student' | 'teacher' | 'admin'
  
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Authentication functions
  const login = async (roleType, identifier, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleType, identifier, password }),
      });
      const data = await res.json();
      
      if (data.success && data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        
        setUser(data.user);
        setIsAuthenticated(true);
        setRole(data.user.role);
        
        // Map user profile to app context
        if (data.user.role === 'student' && data.user.registerNumber) {
           const match = students.find(s => s.roll_number === data.user.registerNumber || s.rollNumber === data.user.registerNumber || s.id === data.user.registerNumber);
           if (match) {
             setCurrentStudentId(match.id);
           } else {
             const fallbackMatch = students.find(s => s.id === 'STU-2023-084');
             if (fallbackMatch) setCurrentStudentId(fallbackMatch.id);
           }
        }
        
        return { success: true, role: data.user.role };
      } else {
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Network error. Could not connect to server.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
    setRole(null);
  };

  // Load initial student data from backend API if available
  useEffect(() => {
    async function fetchStudentsFromBackend() {
      try {
        const res = await fetch(`${API_BASE_URL}/students`);
        if (res.ok) {
          const body = await res.json();
          if (body.success && body.data && body.data.length > 0) {
            const mappedData = body.data.map(student => ({
              ...student,
              rollNumber: student.roll_number || student.rollNumber,
              academicRisk: student.academic_risk || student.academicRisk,
              attendancePercentage: student.attendance_percentage || student.attendancePercentage,
            }));
            setStudents(mappedData);
            setIsBackendConnected(true);
            console.log('✅ Academic Context synced with Express Backend API');
          }
        }
      } catch (err) {
        console.warn('ℹ️ Express Backend not reached, running in standalone client mode.');
      }
    }
    fetchStudentsFromBackend();
  }, []);

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
  const updateStudentAcademicRecord = async (studentId, updatedFields) => {
    // Try sending update request to Backend API first
    try {
      const res = await fetch(`${API_BASE_URL}/students/${studentId}/academic-record`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const body = await res.json();
        if (body.success && body.data) {
          setStudents((prev) =>
            prev.map((s) => (s.id === studentId ? body.data : s))
          );
          triggerNotification(`Academic record updated & saved via Backend for ${studentId}!`);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend update endpoint unavailable, updating client state.');
    }

    // Client-side fallback update logic
    setStudents((prevStudents) =>
      prevStudents.map((stu) => {
        if (stu.id !== studentId) return stu;

        // Clone subjects
        const subjects = (updatedFields.subjects || stu.subjects).map((sub) => {
          const assignmentScore = Number(sub.assignmentScore);
          const recentExams = sub.recentExams || [];
          const examSum = recentExams.reduce((acc, ex) => acc + Number(ex.score), 0);
          const examScore = recentExams.length ? Math.round(examSum / recentExams.length) : Number(sub.examScore || 0);

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

  // Add new student dynamically
  const addNewStudent = (newStudentData) => {
    const newId = `STU-2023-${String(students.length + 100).padStart(3, '0')}`;
    const fullStudentObj = {
      id: newId,
      name: newStudentData.name || 'New Student',
      email: newStudentData.email || 'student@university.edu',
      avatar: newStudentData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: newStudentData.department || 'Computer Science and Engineering',
      year: newStudentData.year || '3rd Year',
      semester: newStudentData.semester || 'Semester 6',
      batch: newStudentData.batch || '2022 - 2026',
      section: newStudentData.section || 'CSE-B',
      advisor: 'Dr. A. Ramanathan',
      metrics: {
        attendance: 85,
        attendanceTarget: 85,
        attendanceClassesPresent: 170,
        attendanceTotalClasses: 200,
        assignmentAverage: 75,
        examinationAverage: 70,
        overallPerformance: 72,
        gpa: '7.2 / 10',
        rankInClass: students.length + 1,
        totalStudents: students.length + 1,
      },
      academicRisk: {
        level: 'Low',
        score: 15,
        primaryFactor: 'Satisfactory overall academic progress',
        summary: 'Recently added student profile.',
        factors: [],
      },
      subjects: [
        { id: 'sub-new-1', code: 'CS601', name: 'Advanced Java Programming', credits: 4, professor: 'Prof. K. Venkatesh', assignmentScore: 80, examScore: 75, score: 77, status: 'Good', color: '#6366f1', grade: 'B+' },
        { id: 'sub-new-2', code: 'MA602', name: 'Applied Discrete Mathematics', credits: 4, professor: 'Dr. S. Meenakshi', assignmentScore: 70, examScore: 65, score: 67, status: 'Good', color: '#f59e0b', grade: 'C+' },
      ],
    };

    setStudents((prev) => [...prev, fullStudentObj]);
    setCurrentStudentId(newId);
    triggerNotification(`New student "${fullStudentObj.name}" created dynamically!`);
  };

  // Record Attendance dynamically (Present / Absent)
  const recordStudentAttendance = (studentId, isPresent) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const total = (s.metrics.attendanceTotalClasses || 200) + 1;
        const present = (s.metrics.attendanceClassesPresent || 164) + (isPresent ? 1 : 0);
        const newAtt = Math.round((present / total) * 100);

        return {
          ...s,
          metrics: {
            ...s.metrics,
            attendanceTotalClasses: total,
            attendanceClassesPresent: present,
            attendance: newAtt,
          },
        };
      })
    );
    triggerNotification(`Attendance recorded: ${isPresent ? 'Present (+1)' : 'Absent (0)'}`);
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
        isAuthenticated,
        user,
        login,
        logout,
        teacherInfo,
        updateStudentAcademicRecord,
        addNewStudent,
        recordStudentAttendance,
        isBackendConnected,
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
