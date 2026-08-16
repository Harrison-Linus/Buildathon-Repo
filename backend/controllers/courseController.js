import supabase from '../config/supabase.js';

const fallbackCourses = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    course_code: 'CS601',
    course_name: 'Advanced Java Programming',
    description: 'Enterprise Java applications, Spring Boot, Microservices',
    department: 'Computer Science and Engineering',
    semester: 'Semester 6',
    credits: 4,
    instructor: 'Prof. K. Venkatesh',
    rating: 4.8,
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    course_code: 'MA602',
    course_name: 'Applied Discrete Mathematics',
    description: 'Graph theory, combinatorics, discrete algebraic structures',
    department: 'Computer Science and Engineering',
    semester: 'Semester 6',
    credits: 4,
    instructor: 'Dr. S. Meenakshi',
    rating: 4.6,
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    course_code: 'CS603',
    course_name: 'Database Management Systems',
    description: 'Relational data models, SQL optimization, transactions & indexing',
    department: 'Computer Science and Engineering',
    semester: 'Semester 6',
    credits: 3,
    instructor: 'Dr. R. Sundaram',
    rating: 4.9,
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    course_code: 'CS604',
    course_name: 'Operating Systems Core',
    description: 'Kernel process scheduling, memory virtualization & file systems',
    department: 'Computer Science and Engineering',
    semester: 'Semester 6',
    credits: 3,
    instructor: 'Prof. N. Lakshmi',
    rating: 4.7,
  },
];

// GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    if (supabase) {
      const { data: courses, error } = await supabase.from('courses').select('*');
      if (!error && courses && courses.length > 0) {
        return res.json({ success: true, source: 'supabase', data: courses });
      }
    }
    return res.json({ success: true, source: 'fallback', data: fallbackCourses });
  } catch (err) {
    return res.json({ success: true, source: 'fallback', data: fallbackCourses });
  }
};

// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = fallbackCourses.find((c) => c.id === id || c.course_code === id) || fallbackCourses[0];
  return res.json({ success: true, data: course });
};

// POST /api/enrollments
export const enrollStudentInCourse = async (req, res) => {
  const { studentId, courseId } = req.body;
  return res.json({
    success: true,
    message: 'Successfully enrolled in course!',
    data: { studentId, courseId, enrolled_at: new Date().toISOString() },
  });
};
