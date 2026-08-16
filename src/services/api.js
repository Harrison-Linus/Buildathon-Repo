// Centralized Frontend API Service Layer

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const apiService = {
  // Auth APIs
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getCurrentUser: () => request('/auth/me'),

  // Student APIs
  getStudents: () => request('/students'),
  getStudentById: (id) => request(`/students/${id}`),
  updateStudentRecord: (id, fields) => request(`/students/${id}/academic-record`, { method: 'PUT', body: JSON.stringify(fields) }),

  // Teacher APIs
  getTeacherProfile: () => request('/teacher/profile'),

  // Course APIs
  getCourses: () => request('/courses'),
  getCourseById: (id) => request(`/courses/${id}`),
  enrollCourse: (data) => request('/courses/enroll', { method: 'POST', body: JSON.stringify(data) }),

  // AI Engine APIs
  getAiAnalysis: (studentId) => request(`/ai/student/${studentId}`),

  // Admin APIs
  getAdminAnalytics: () => request('/admin/analytics'),
  getAdminReports: () => request('/admin/reports'),
};
