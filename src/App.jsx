import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AcademicProvider, useAcademic } from './context/AcademicContext';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import TeacherLayout from './components/layout/TeacherLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import Contact from './pages/public/Contact';

// Auth Page
import Login from './pages/Login';

// Student Pages
import Dashboard from './pages/Dashboard';
import Performance from './pages/Performance';
import Recommendations from './pages/Recommendations';
import AttendanceView from './pages/student/AttendanceView';
import AssignmentsView from './pages/student/AssignmentsView';
import ExamsView from './pages/student/ExamsView';

// Teacher Pages
import TeacherDashboard from './pages/TeacherDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageCourses from './pages/admin/ManageCourses';
import ReportsView from './pages/admin/ReportsView';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAcademic();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'student') return <Navigate to="/dashboard" replace />;
    if (role === 'teacher') return <Navigate to="/teacher/dashboard" replace />;
    if (role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  const { isAuthenticated, role } = useAcademic();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth Route */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to={role === 'student' ? '/dashboard' : role === 'teacher' ? '/teacher/dashboard' : '/admin'} replace />
          ) : (
            <Login />
          )
        } 
      />

      {/* Student Portal Routes */}
      <Route element={
        <ProtectedRoute allowedRoles={['student']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/attendance" element={<AttendanceView />} />
        <Route path="/assignments" element={<AssignmentsView />} />
        <Route path="/exams" element={<ExamsView />} />
      </Route>

      {/* Teacher Portal Routes */}
      <Route element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout />
        </ProtectedRoute>
      }>
        <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/students" element={<TeacherDashboard />} />
      </Route>

      {/* Admin Portal Routes */}
      <Route element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/reports" element={<ReportsView />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AcademicProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AcademicProvider>
  );
}
