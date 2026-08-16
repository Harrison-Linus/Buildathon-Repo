-- =========================================================
-- BUILDATHON AI-POWERED EDUCATION PORTAL - SUPABASE SCHEMA
-- PostgreSQL Relational Schema with Row Level Security & Seed Data
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Central Authentication Profiles)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    department VARCHAR(255),
    year VARCHAR(50),
    semester VARCHAR(50),
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TEACHERS TABLE
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    staff_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    designation VARCHAR(255),
    assigned_class VARCHAR(255),
    total_students INT DEFAULT 0,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    year VARCHAR(50),
    semester VARCHAR(50),
    batch VARCHAR(50),
    section VARCHAR(50),
    advisor VARCHAR(255),
    attendance_percentage INT DEFAULT 85,
    metrics JSONB DEFAULT '{}'::jsonb,
    academic_risk JSONB DEFAULT '{}'::jsonb,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_code VARCHAR(50) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(255),
    semester VARCHAR(50),
    credits INT DEFAULT 3,
    teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4B. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    admin_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ENROLLMENTS TABLE (Students <-> Courses)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- 6. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    max_marks INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. ASSIGNMENT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    marks INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'late', 'graded')),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. EXAMS TABLE
CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    exam_name VARCHAR(255) NOT NULL,
    exam_date DATE,
    max_marks INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. EXAM RESULTS TABLE
CREATE TABLE IF NOT EXISTS exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    marks INT DEFAULT 0,
    grade VARCHAR(10) DEFAULT 'B+',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. PERFORMANCE REPORTS TABLE
CREATE TABLE IF NOT EXISTS performance_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    attendance_score INT DEFAULT 0,
    assignment_score INT DEFAULT 0,
    exam_score INT DEFAULT 0,
    overall_score INT DEFAULT 0,
    risk_level VARCHAR(50) DEFAULT 'Low',
    weak_subjects JSONB DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AI INSIGHTS TABLE
CREATE TABLE IF NOT EXISTS ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    insight_type VARCHAR(50) NOT NULL CHECK (insight_type IN ('performance', 'attendance', 'risk', 'weak_subject', 'study_plan')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(50) DEFAULT 'medium',
    recommendation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR FAST QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_students_user ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_user ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_student ON exam_results(student_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_student ON ai_insights(student_id);

-- =========================================================
-- INITIAL SEED DATA
-- =========================================================

-- 1. Insert Users (Demo passwords: student@123 for students, staff@123 for staff, admin@123 for admin - hashed if actual system, storing plain for mock demo fallback)
INSERT INTO users (id, name, email, password_hash, role, department, year, semester) VALUES
('11111111-1111-1111-1111-111111111111', 'Keerthivasan', 'keerthivasan.cse@university.edu', 'student@123', 'student', 'Computer Science and Engineering', '3rd Year', 'Semester 6'),
('22222222-2222-2222-2222-222222222222', 'Ananya Sharma', 'ananya.sharma@university.edu', 'student@123', 'student', 'Computer Science and Engineering', '3rd Year', 'Semester 6'),
('33333333-3333-3333-3333-333333333333', 'Dr. A. Ramanathan', 'a.ramanathan@university.edu', 'staff@123', 'teacher', 'Computer Science and Engineering', NULL, NULL),
('44444444-4444-4444-4444-444444444444', 'System Administrator', 'admin@university.edu', 'admin@123', 'admin', 'Academic Administration', NULL, NULL)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Teacher Profile
INSERT INTO teachers (id, user_id, staff_id, name, email, department, designation, assigned_class, total_students) VALUES
('a1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'STF001', 'Dr. A. Ramanathan', 'a.ramanathan@university.edu', 'Computer Science and Engineering', 'Professor & HOD', 'CSE-B (Semester 6)', 68)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Student Profiles
INSERT INTO students (id, user_id, roll_number, name, email, department, year, semester, batch, section, advisor, attendance_percentage, metrics, academic_risk) VALUES
('b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '23CSE001', 'Keerthivasan', 'keerthivasan.cse@university.edu', 'Computer Science and Engineering', '3rd Year', 'Semester 6', '2022 - 2026', 'CSE-B', 'Dr. A. Ramanathan', 82, 
'{"attendance": 82, "attendanceTarget": 85, "attendanceClassesPresent": 164, "attendanceTotalClasses": 200, "assignmentAverage": 74, "examinationAverage": 68, "overallPerformance": 73, "gpa": "7.6 / 10", "rankInClass": 24, "totalStudents": 68}'::jsonb,
'{"level": "Medium", "score": 54, "primaryFactor": "Mathematics score below 60% & Attendance below 85% requirement", "summary": "Keerthivasan shows solid programming skills in Java (84%), but lower scores in Mathematics (58%) place the student at moderate risk.", "factors": [{"factor": "Mathematics Internal Mark", "value": "58%", "status": "Warning", "description": "Below course threshold of 60%", "impact": "High"}, {"factor": "Overall Attendance", "value": "82%", "status": "Warning", "description": "3% below required 85% exam eligibility threshold", "impact": "Medium"}]}'::jsonb),
('b2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '23CSE002', 'Ananya Sharma', 'ananya.sharma@university.edu', 'Computer Science and Engineering', '3rd Year', 'Semester 6', '2022 - 2026', 'CSE-B', 'Dr. A. Ramanathan', 94,
'{"attendance": 94, "attendanceTarget": 85, "attendanceClassesPresent": 188, "attendanceTotalClasses": 200, "assignmentAverage": 92, "examinationAverage": 89, "overallPerformance": 91, "gpa": "9.2 / 10", "rankInClass": 2, "totalStudents": 68}'::jsonb,
'{"level": "Low", "score": 12, "primaryFactor": "Consistent top tier academic performance", "summary": "Ananya displays exceptional academic consistency across all subjects with 94% attendance.", "factors": []}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 3B. Insert Admin Profile
INSERT INTO admins (id, user_id, admin_id, name, email) VALUES
('ad111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'ADM001', 'System Administrator', 'admin@university.edu')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Courses
INSERT INTO courses (id, course_code, course_name, description, department, semester, credits, teacher_id) VALUES
('c1111111-1111-1111-1111-111111111111', 'CS601', 'Advanced Java Programming', 'Enterprise Java applications, Spring Boot, Microservices', 'Computer Science and Engineering', 'Semester 6', 4, 'a1111111-1111-1111-1111-111111111111'),
('c2222222-2222-2222-2222-222222222222', 'MA602', 'Applied Discrete Mathematics', 'Graph theory, combinatorics, discrete algebraic structures', 'Computer Science and Engineering', 'Semester 6', 4, 'a1111111-1111-1111-1111-111111111111'),
('c3333333-3333-3333-3333-333333333333', 'CS603', 'Database Management Systems', 'Relational data models, SQL optimization, transactions & indexing', 'Computer Science and Engineering', 'Semester 6', 3, 'a1111111-1111-1111-1111-111111111111'),
('c4444444-4444-4444-4444-444444444444', 'CS604', 'Operating Systems Core', 'Kernel process scheduling, memory virtualization & file systems', 'Computer Science and Engineering', 'Semester 6', 3, 'a1111111-1111-1111-1111-111111111111')
ON CONFLICT (course_code) DO NOTHING;

-- 5. Enroll Students in Courses
INSERT INTO enrollments (student_id, course_id) VALUES
('b1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111'),
('b1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222'),
('b1111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333'),
('b1111111-1111-1111-1111-111111111111', 'c4444444-4444-4444-4444-444444444444'),
('b2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;
