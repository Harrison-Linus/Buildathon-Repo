import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AcademicProvider } from './context/AcademicContext';
import DashboardLayout from './components/layout/DashboardLayout';
import TeacherLayout from './components/layout/TeacherLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Performance from './pages/Performance';
import Recommendations from './pages/Recommendations';
import TeacherDashboard from './pages/TeacherDashboard';

export default function App() {
  return (
    <AcademicProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Student Portal Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Route>

          {/* Member 2: Teacher Portal Routes */}
          <Route element={<TeacherLayout />}>
            <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/students" element={<TeacherDashboard />} />
          </Route>

          {/* Default / Fallback */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AcademicProvider>
  );
}
