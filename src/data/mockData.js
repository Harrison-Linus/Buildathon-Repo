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
