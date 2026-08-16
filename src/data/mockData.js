export const teacherInfo = {
  id: "TCH-1002",
  name: "Dr. A. Ramanathan",
  designation: "Professor & HOD",
  department: "Computer Science and Engineering",
  email: "a.ramanathan@university.edu",
  assignedClass: "CSE-B (Semester 6)",
  totalStudents: 68,
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
};

export const studentData = {
  id: "STU-2023-084",
  name: "Keerthivasan",
  email: "keerthivasan.cse@university.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  department: "Computer Science and Engineering",
  year: "3rd Year",
  semester: "Semester 6",
  batch: "2022 - 2026",
  section: "CSE-B",
  advisor: "Dr. A. Ramanathan (Professor, Dept of CSE)",

  // Summary Metrics
  metrics: {
    attendance: 82, // %
    attendanceTarget: 85,
    attendanceClassesPresent: 164,
    attendanceTotalClasses: 200,
    assignmentAverage: 74, // %
    examinationAverage: 68, // %
    overallPerformance: 73, // %
    gpa: "7.6 / 10",
    rankInClass: 24,
    totalStudents: 68,
  },

  // Academic Risk Assessment
  academicRisk: {
    level: "Medium", // Low, Medium, High
    score: 54, // 0 to 100 risk score
    primaryFactor: "Mathematics score below 60% & Attendance below 85% requirement",
    summary: "Keerthivasan shows solid programming skills in Java (84%), but lower scores in Mathematics (58%) and examination average (68%) place the student at moderate risk of credit backlogs if not remediated before End-Sem exams.",
    factors: [
      {
        factor: "Mathematics Internal Mark",
        value: "58%",
        status: "Warning",
        description: "Below course threshold of 60%",
        impact: "High",
      },
      {
        factor: "Overall Attendance",
        value: "82%",
        status: "Warning",
        description: "3% below required 85% exam eligibility threshold",
        impact: "Medium",
      },
      {
        factor: "Exam vs Assignment Gap",
        value: "-6%",
        status: "Moderate",
        description: "Exam performance (68%) lags assignment score (74%)",
        impact: "Low",
      },
    ],
  },

  // Subject Performance
  subjects: [
    {
      code: "CS601",
      name: "Mathematics",
      score: 58,
      grade: "C+",
      credits: 4,
      attendance: 78,
      assignmentScore: 65,
      examScore: 54,
      status: "Weak",
      color: "#ef4444", // Red
      faculty: "Dr. K. Srinivas",
      weakTopics: [
        "Eigenvalues & Eigenvectors",
        "Bayesian Probability Distribution",
        "Discrete Transform Theorems",
      ],
      strengths: ["Matrix Multiplication Basics", "Set Theory"],
      recentExams: [
        { test: "Internal Test 1", score: 54, max: 100 },
        { test: "Internal Test 2", score: 62, max: 100 },
        { test: "Model Exam", score: 58, max: 100 },
      ],
    },
    {
      code: "CS602",
      name: "DBMS",
      score: 72,
      grade: "B+",
      credits: 3,
      attendance: 84,
      assignmentScore: 78,
      examScore: 69,
      status: "Good",
      color: "#f59e0b", // Amber
      faculty: "Prof. S. Meenakshi",
      weakTopics: ["B+ Tree Indexing", "Transaction Serializability & Locks"],
      strengths: ["SQL Complex Queries", "ER Modeling", "Normalization (3NF)"],
      recentExams: [
        { test: "Internal Test 1", score: 70, max: 100 },
        { test: "Internal Test 2", score: 75, max: 100 },
        { test: "Model Exam", score: 71, max: 100 },
      ],
    },
    {
      code: "CS603",
      name: "Java",
      score: 84,
      grade: "A",
      credits: 4,
      attendance: 88,
      assignmentScore: 90,
      examScore: 81,
      status: "Strong",
      color: "#10b981", // Emerald
      faculty: "Prof. V. Karthik",
      weakTopics: ["Multithreading Deadlocks"],
      strengths: ["OOP Concepts", "Collections Framework", "Spring Boot Basics", "Stream API"],
      recentExams: [
        { test: "Internal Test 1", score: 82, max: 100 },
        { test: "Internal Test 2", score: 88, max: 100 },
        { test: "Model Exam", score: 82, max: 100 },
      ],
    },
    {
      code: "CS604",
      name: "Computer Networks",
      score: 76,
      grade: "B+",
      credits: 3,
      attendance: 80,
      assignmentScore: 75,
      examScore: 77,
      status: "Good",
      color: "#6366f1", // Indigo
      faculty: "Dr. R. Shalini",
      weakTopics: ["Subnetting & CIDR Calculations", "Congestion Control Algorithms"],
      strengths: ["OSI & TCP/IP Stack", "Routing Protocols (OSPF/BGP)", "Socket Programming"],
      recentExams: [
        { test: "Internal Test 1", score: 74, max: 100 },
        { test: "Internal Test 2", score: 79, max: 100 },
        { test: "Model Exam", score: 75, max: 100 },
      ],
    },
  ],

  // AI Recommendations
  aiRecommendations: [
    {
      id: "rec-1",
      title: "Practice Mathematics for 45 minutes daily",
      category: "Daily Routine",
      subject: "Mathematics",
      priority: "High",
      icon: "Clock",
      description: "Focus on Linear Algebra and Eigenvalue calculation steps. Continuous spaced repetition will raise your conceptual retention from 58% to target 75%+.",
      actionLabel: "Start 45m Focus Session",
      actionType: "timer",
      completed: false,
      recommendedSchedule: "6:00 PM - 6:45 PM Daily",
    },
    {
      id: "rec-2",
      title: "Complete 3 additional problems from weak topics",
      category: "Skill Remediation",
      subject: "Mathematics & DBMS",
      priority: "High",
      icon: "FileCode",
      description: "Solve 2 matrix diagonalisation problems and 1 SQL transaction concurrency locking problem generated specifically from your recent test mistakes.",
      actionLabel: "View Practice Problems",
      actionType: "practice",
      completed: false,
      recommendedSchedule: "Before Friday Quiz",
    },
    {
      id: "rec-3",
      title: "Maintain attendance above 85%",
      category: "Compliance",
      subject: "All Subjects",
      priority: "Critical",
      icon: "CalendarCheck",
      description: "Current attendance is 82% (164/200 periods). You need to attend the next 8 consecutive class periods without absence to cross the mandatory 85% exam clearance mark.",
      actionLabel: "Open Attendance Simulator",
      actionType: "attendance",
      completed: false,
      recommendedSchedule: "Next 2 Weeks",
    },
    {
      id: "rec-4",
      title: "Review previous examination mistakes",
      category: "Exam Strategy",
      subject: "Mathematics & Networks",
      priority: "Medium",
      icon: "AlertCircle",
      description: "Review question #4 (Characteristic Polynomial derivation) from Internal-1 and question #7 (Subnet mask boundary) where 18 marks were lost due to calculation steps.",
      actionLabel: "Inspect Mistake Log",
      actionType: "mistakes",
      completed: false,
      recommendedSchedule: "Weekend Revision",
    },
  ],

  // Past Examination Mistake Log for Interactive Review
  examMistakes: [
    {
      id: "m-1",
      subject: "Mathematics",
      exam: "Internal Test 1",
      question: "Q4: Find eigenvalues and eigenvectors for 3x3 Matrix A = [[2, -1, 1], [2, 2, -1], [1, 2, -1]]",
      lostMarks: 8,
      errorType: "Sign error during determinant polynomial expansion",
      aiRemedy: "Use Sarrus Rule or systematic minor cofactors with bracket highlighting to avoid -(-x) miscalculations.",
    },
    {
      id: "m-2",
      subject: "Mathematics",
      exam: "Model Exam",
      question: "Q8: Solve Poisson distribution probability for P(X >= 2) with lambda = 1.5",
      lostMarks: 6,
      errorType: "Computed 1 - P(X <= 2) instead of 1 - [P(X=0) + P(X=1)]",
      aiRemedy: "Remember discrete strictly-greater vs greater-equal boundary conditions.",
    },
    {
      id: "m-3",
      subject: "Computer Networks",
      exam: "Internal Test 2",
      question: "Q6: Calculate usable host count and broadcast IP for 192.168.10.64/27",
      lostMarks: 4,
      errorType: "Forgot to subtract network and broadcast addresses (2^5 - 2)",
      aiRemedy: "Usable hosts is always 2^(32-prefix) - 2 for standard IPv4 unicast subnets.",
    },
  ],

  // Interactive Practice Questions for Weak Topics
  practiceQuestions: [
    {
      id: "p-1",
      subject: "Mathematics",
      topic: "Eigenvalues",
      difficulty: "Medium",
      question: "For matrix M = [[4, 2], [1, 3]], find the characteristic equation and its eigenvalues.",
      hint: "Characteristic equation is det(M - λI) = 0 => (4-λ)(3-λ) - 2 = 0",
      solution: "λ^2 - 7λ + 10 = 0 => (λ - 5)(λ - 2) = 0. Eigenvalues are λ1 = 5, λ2 = 2.",
    },
    {
      id: "p-2",
      subject: "Mathematics",
      topic: "Probability",
      difficulty: "Hard",
      question: "A test has 95% true positive rate and 2% false positive rate for a condition affecting 1% of population. Find P(Condition | Positive Test).",
      hint: "Apply Bayes' Theorem: P(C|+) = [P(+|C)*P(C)] / [P(+|C)*P(C) + P(+|~C)*P(~C)]",
      solution: "P(C|+) = (0.95 * 0.01) / (0.95*0.01 + 0.02*0.99) = 0.0095 / (0.0095 + 0.0198) = 0.0095 / 0.0293 ≈ 32.42%",
    },
    {
      id: "p-3",
      subject: "DBMS",
      topic: "Transactions & Locks",
      difficulty: "Medium",
      question: "Why does Strict 2-Phase Locking (Strict 2PL) prevent cascading rollbacks?",
      hint: "Consider when exclusive (X) locks are released in Strict 2PL.",
      solution: "In Strict 2PL, all exclusive locks acquired by a transaction are held until the transaction either commits or aborts. Thus, no uncommitted data is read by other transactions.",
    }
  ],

  // Historical Semester Progression
  semesterHistory: [
    { semester: "Sem 1", gpa: 8.2, attendance: 91 },
    { semester: "Sem 2", gpa: 8.0, attendance: 88 },
    { semester: "Sem 3", gpa: 7.8, attendance: 85 },
    { semester: "Sem 4", gpa: 7.9, attendance: 84 },
    { semester: "Sem 5", gpa: 7.4, attendance: 81 },
    { semester: "Sem 6 (Current)", gpa: 7.6, attendance: 82 },
  ],
};

export const initialStudentsList = [
  studentData,
  {
    id: "STU-2023-085",
    name: "Ananya Sharma",
    email: "ananya.sharma@university.edu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    batch: "2022 - 2026",
    section: "CSE-B",
    advisor: "Dr. A. Ramanathan (Professor, Dept of CSE)",

    metrics: {
      attendance: 94,
      attendanceTarget: 85,
      attendanceClassesPresent: 188,
      attendanceTotalClasses: 200,
      assignmentAverage: 92,
      examinationAverage: 89,
      overallPerformance: 91,
      gpa: "9.2 / 10",
      rankInClass: 2,
      totalStudents: 68,
    },

    academicRisk: {
      level: "Low",
      score: 12,
      primaryFactor: "Consistent top tier academic performance",
      summary: "Ananya displays exceptional academic consistency across all subjects with 94% attendance and strong exam performance.",
      factors: [
        { factor: "Overall Attendance", value: "94%", status: "Excellent", description: "Well above requirement", impact: "None" },
        { factor: "Mathematics Score", value: "90%", status: "Excellent", description: "Top percentile", impact: "None" },
      ],
    },

    subjects: [
      {
        code: "CS601", name: "Mathematics", score: 90, grade: "S", credits: 4, attendance: 95, assignmentScore: 94, examScore: 88, status: "Strong", color: "#10b981", faculty: "Dr. K. Srinivas",
        weakTopics: [], strengths: ["Eigenvalues", "Probability", "Transforms"],
        recentExams: [{ test: "Internal Test 1", score: 88, max: 100 }, { test: "Internal Test 2", score: 92, max: 100 }, { test: "Model Exam", score: 90, max: 100 }]
      },
      {
        code: "CS602", name: "DBMS", score: 92, grade: "S", credits: 3, attendance: 92, assignmentScore: 95, examScore: 90, status: "Strong", color: "#10b981", faculty: "Prof. S. Meenakshi",
        weakTopics: [], strengths: ["SQL", "Transactions", "Indexing"],
        recentExams: [{ test: "Internal Test 1", score: 90, max: 100 }, { test: "Internal Test 2", score: 94, max: 100 }, { test: "Model Exam", score: 92, max: 100 }]
      },
      {
        code: "CS603", name: "Java", score: 94, grade: "S", credits: 4, attendance: 96, assignmentScore: 96, examScore: 93, status: "Strong", color: "#10b981", faculty: "Prof. V. Karthik",
        weakTopics: [], strengths: ["OOP", "Spring Boot", "Collections"],
        recentExams: [{ test: "Internal Test 1", score: 94, max: 100 }, { test: "Internal Test 2", score: 96, max: 100 }, { test: "Model Exam", score: 92, max: 100 }]
      },
      {
        code: "CS604", name: "Computer Networks", score: 88, grade: "A+", credits: 3, attendance: 93, assignmentScore: 90, examScore: 86, status: "Strong", color: "#10b981", faculty: "Dr. R. Shalini",
        weakTopics: [], strengths: ["Routing", "Socket Programming"],
        recentExams: [{ test: "Internal Test 1", score: 86, max: 100 }, { test: "Internal Test 2", score: 90, max: 100 }, { test: "Model Exam", score: 88, max: 100 }]
      },
    ],
  },
  {
    id: "STU-2023-086",
    name: "Rahul Verma",
    email: "rahul.verma@university.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    batch: "2022 - 2026",
    section: "CSE-B",
    advisor: "Dr. A. Ramanathan (Professor, Dept of CSE)",

    metrics: {
      attendance: 72,
      attendanceTarget: 85,
      attendanceClassesPresent: 144,
      attendanceTotalClasses: 200,
      assignmentAverage: 60,
      examinationAverage: 51,
      overallPerformance: 54,
      gpa: "5.8 / 10",
      rankInClass: 61,
      totalStudents: 68,
    },

    academicRisk: {
      level: "High",
      score: 82,
      primaryFactor: "Low Attendance (72%) & Multiple Subjects < 55%",
      summary: "Rahul is at severe risk of exam debarment due to 72% attendance and low internal test scores in Mathematics (45%) and Computer Networks (48%).",
      factors: [
        { factor: "Overall Attendance", value: "72%", status: "Critical", description: "13% below clearance threshold", impact: "High" },
        { factor: "Mathematics Score", value: "45%", status: "Critical", description: "Failing internal threshold", impact: "High" },
        { factor: "Networks Score", value: "48%", status: "Critical", description: "Below course threshold", impact: "Medium" },
      ],
    },

    subjects: [
      {
        code: "CS601", name: "Mathematics", score: 45, grade: "U", credits: 4, attendance: 68, assignmentScore: 50, examScore: 42, status: "Weak", color: "#ef4444", faculty: "Dr. K. Srinivas",
        weakTopics: ["Linear Algebra", "Calculus", "Probability"], strengths: [],
        recentExams: [{ test: "Internal Test 1", score: 40, max: 100 }, { test: "Internal Test 2", score: 48, max: 100 }, { test: "Model Exam", score: 45, max: 100 }]
      },
      {
        code: "CS602", name: "DBMS", score: 62, grade: "C", credits: 3, attendance: 75, assignmentScore: 65, examScore: 60, status: "Moderate", color: "#f59e0b", faculty: "Prof. S. Meenakshi",
        weakTopics: ["Normalization", "Indexing"], strengths: ["Basic SQL"],
        recentExams: [{ test: "Internal Test 1", score: 58, max: 100 }, { test: "Internal Test 2", score: 64, max: 100 }, { test: "Model Exam", score: 60, max: 100 }]
      },
      {
        code: "CS603", name: "Java", score: 60, grade: "C", credits: 4, attendance: 76, assignmentScore: 68, examScore: 55, status: "Moderate", color: "#f59e0b", faculty: "Prof. V. Karthik",
        weakTopics: ["OOP Principles", "Exceptions"], strengths: ["Basic Syntax"],
        recentExams: [{ test: "Internal Test 1", score: 52, max: 100 }, { test: "Internal Test 2", score: 62, max: 100 }, { test: "Model Exam", score: 58, max: 100 }]
      },
      {
        code: "CS604", name: "Computer Networks", score: 48, grade: "U", credits: 3, attendance: 69, assignmentScore: 55, examScore: 44, status: "Weak", color: "#ef4444", faculty: "Dr. R. Shalini",
        weakTopics: ["TCP/IP Header", "Subnetting"], strengths: [],
        recentExams: [{ test: "Internal Test 1", score: 42, max: 100 }, { test: "Internal Test 2", score: 50, max: 100 }, { test: "Model Exam", score: 46, max: 100 }]
      },
    ],
  },
  {
    id: "STU-2023-087",
    name: "Priya Patel",
    email: "priya.patel@university.edu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    batch: "2022 - 2026",
    section: "CSE-B",
    advisor: "Dr. A. Ramanathan (Professor, Dept of CSE)",

    metrics: {
      attendance: 91,
      attendanceTarget: 85,
      attendanceClassesPresent: 182,
      attendanceTotalClasses: 200,
      assignmentAverage: 88,
      examinationAverage: 85,
      overallPerformance: 86,
      gpa: "8.7 / 10",
      rankInClass: 8,
      totalStudents: 68,
    },

    academicRisk: {
      level: "Low",
      score: 18,
      primaryFactor: "Good academic standing",
      summary: "Priya maintains strong academic records across programming and database subjects with 91% attendance.",
      factors: [],
    },

    subjects: [
      {
        code: "CS601", name: "Mathematics", score: 82, grade: "A", credits: 4, attendance: 90, assignmentScore: 85, examScore: 80, status: "Strong", color: "#10b981", faculty: "Dr. K. Srinivas",
        weakTopics: ["Complex Analysis"], strengths: ["Linear Algebra", "Matrices"],
        recentExams: [{ test: "Internal Test 1", score: 80, max: 100 }, { test: "Internal Test 2", score: 84, max: 100 }, { test: "Model Exam", score: 82, max: 100 }]
      },
      {
        code: "CS602", name: "DBMS", score: 88, grade: "A+", credits: 3, attendance: 92, assignmentScore: 90, examScore: 86, status: "Strong", color: "#10b981", faculty: "Prof. S. Meenakshi",
        weakTopics: [], strengths: ["ER Diagram", "Relational Algebra", "SQL"],
        recentExams: [{ test: "Internal Test 1", score: 85, max: 100 }, { test: "Internal Test 2", score: 90, max: 100 }, { test: "Model Exam", score: 88, max: 100 }]
      },
      {
        code: "CS603", name: "Java", score: 90, grade: "S", credits: 4, attendance: 93, assignmentScore: 92, examScore: 88, status: "Strong", color: "#10b981", faculty: "Prof. V. Karthik",
        weakTopics: [], strengths: ["Java FX", "Multithreading"],
        recentExams: [{ test: "Internal Test 1", score: 88, max: 100 }, { test: "Internal Test 2", score: 92, max: 100 }, { test: "Model Exam", score: 90, max: 100 }]
      },
      {
        code: "CS604", name: "Computer Networks", score: 84, grade: "A", credits: 3, attendance: 89, assignmentScore: 86, examScore: 82, status: "Strong", color: "#10b981", faculty: "Dr. R. Shalini",
        weakTopics: [], strengths: ["Application Layer Protocols"],
        recentExams: [{ test: "Internal Test 1", score: 82, max: 100 }, { test: "Internal Test 2", score: 86, max: 100 }, { test: "Model Exam", score: 84, max: 100 }]
      },
    ],
  },
  {
    id: "STU-2023-088",
    name: "Dinesh Kumar",
    email: "dinesh.kumar@university.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    batch: "2022 - 2026",
    section: "CSE-B",
    advisor: "Dr. A. Ramanathan (Professor, Dept of CSE)",

    metrics: {
      attendance: 79,
      attendanceTarget: 85,
      attendanceClassesPresent: 158,
      attendanceTotalClasses: 200,
      assignmentAverage: 65,
      examinationAverage: 55,
      overallPerformance: 59,
      gpa: "6.2 / 10",
      rankInClass: 54,
      totalStudents: 68,
    },

    academicRisk: {
      level: "High",
      score: 74,
      primaryFactor: "Mathematics score 42% & Attendance 79% (< 85%)",
      summary: "Dinesh has critical deficiencies in Mathematics (42%) and attendance (79%), creating backlog risk.",
      factors: [
        { factor: "Mathematics Internal", value: "42%", status: "Critical", description: "Severe shortfall", impact: "High" },
        { factor: "Attendance", value: "79%", status: "Warning", description: "6% below mandatory limit", impact: "Medium" }
      ],
    },

    subjects: [
      {
        code: "CS601", name: "Mathematics", score: 42, grade: "U", credits: 4, attendance: 76, assignmentScore: 50, examScore: 37, status: "Weak", color: "#ef4444", faculty: "Dr. K. Srinivas",
        weakTopics: ["Vector Calculus", "Matrices"], strengths: [],
        recentExams: [{ test: "Internal Test 1", score: 35, max: 100 }, { test: "Internal Test 2", score: 44, max: 100 }, { test: "Model Exam", score: 40, max: 100 }]
      },
      {
        code: "CS602", name: "DBMS", score: 65, grade: "C+", credits: 3, attendance: 80, assignmentScore: 70, examScore: 61, status: "Moderate", color: "#f59e0b", faculty: "Prof. S. Meenakshi",
        weakTopics: ["Joins Optimization"], strengths: ["Tables creation"],
        recentExams: [{ test: "Internal Test 1", score: 60, max: 100 }, { test: "Internal Test 2", score: 68, max: 100 }, { test: "Model Exam", score: 62, max: 100 }]
      },
      {
        code: "CS603", name: "Java", score: 68, grade: "B", credits: 4, attendance: 82, assignmentScore: 72, examScore: 65, status: "Good", color: "#f59e0b", faculty: "Prof. V. Karthik",
        weakTopics: ["Generics"], strengths: ["Arrays", "Loops"],
        recentExams: [{ test: "Internal Test 1", score: 64, max: 100 }, { test: "Internal Test 2", score: 70, max: 100 }, { test: "Model Exam", score: 66, max: 100 }]
      },
      {
        code: "CS604", name: "Computer Networks", score: 60, grade: "C", credits: 3, attendance: 78, assignmentScore: 68, examScore: 55, status: "Moderate", color: "#f59e0b", faculty: "Dr. R. Shalini",
        weakTopics: ["Routing Tables"], strengths: ["Network Topologies"],
        recentExams: [{ test: "Internal Test 1", score: 54, max: 100 }, { test: "Internal Test 2", score: 62, max: 100 }, { test: "Model Exam", score: 58, max: 100 }]
      },
    ],
  },
  {
    id: "STU-2023-089",
    name: "Sneha Reddy",
    email: "sneha.reddy@university.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    semester: "Semester 6",
    batch: "2022 - 2026",
    section: "CSE-B",
    advisor: "Dr. A. Ramanathan (Professor, Dept of CSE)",

    metrics: {
      attendance: 84,
      attendanceTarget: 85,
      attendanceClassesPresent: 168,
      attendanceTotalClasses: 200,
      assignmentAverage: 80,
      examinationAverage: 71,
      overallPerformance: 75,
      gpa: "7.7 / 10",
      rankInClass: 21,
      totalStudents: 68,
    },

    academicRisk: {
      level: "Medium",
      score: 45,
      primaryFactor: "Attendance 84% (1% short of 85%)",
      summary: "Sneha shows steady academic performance but needs 1 more class session to secure the 85% attendance mark.",
      factors: [
        { factor: "Attendance", value: "84%", status: "Warning", description: "1% below limit", impact: "Low" }
      ],
    },

    subjects: [
      {
        code: "CS601", name: "Mathematics", score: 70, grade: "B+", credits: 4, attendance: 82, assignmentScore: 78, examScore: 65, status: "Good", color: "#f59e0b", faculty: "Dr. K. Srinivas",
        weakTopics: ["Fourier Series"], strengths: ["Calculus"],
        recentExams: [{ test: "Internal Test 1", score: 64, max: 100 }, { test: "Internal Test 2", score: 72, max: 100 }, { test: "Model Exam", score: 68, max: 100 }]
      },
      {
        code: "CS602", name: "DBMS", score: 76, grade: "B+", credits: 3, attendance: 85, assignmentScore: 82, examScore: 72, status: "Good", color: "#6366f1", faculty: "Prof. S. Meenakshi",
        weakTopics: ["Concurrency"], strengths: ["Queries"],
        recentExams: [{ test: "Internal Test 1", score: 72, max: 100 }, { test: "Internal Test 2", score: 78, max: 100 }, { test: "Model Exam", score: 72, max: 100 }]
      },
      {
        code: "CS603", name: "Java", score: 80, grade: "A", credits: 4, attendance: 86, assignmentScore: 84, examScore: 77, status: "Strong", color: "#10b981", faculty: "Prof. V. Karthik",
        weakTopics: [], strengths: ["Exception Handling"],
        recentExams: [{ test: "Internal Test 1", score: 76, max: 100 }, { test: "Internal Test 2", score: 82, max: 100 }, { test: "Model Exam", score: 78, max: 100 }]
      },
      {
        code: "CS604", name: "Computer Networks", score: 74, grade: "B+", credits: 3, attendance: 83, assignmentScore: 76, examScore: 71, status: "Good", color: "#6366f1", faculty: "Dr. R. Shalini",
        weakTopics: ["DNS Routing"], strengths: ["IP Addressing"],
        recentExams: [{ test: "Internal Test 1", score: 70, max: 100 }, { test: "Internal Test 2", score: 76, max: 100 }, { test: "Model Exam", score: 72, max: 100 }]
      },
    ],
  },
];
