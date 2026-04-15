import React, { createContext, useContext, useState } from 'react';

// Helper to format date as YYYY-MM-DD
const today = new Date();
const fmt = (d) => d.toISOString().split('T')[0];
const daysAgo = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return fmt(d);
};

// Mock assignments – each has a facultyId field
const initialAssignments = [
  {
    studentId: 'stu-001',
    studentName: 'Arjun Sharma',
    rollNumber: '20CS001',
    department: 'Computer Science',
    year: 'Final Year',
    jobId: 1,
    jobTitle: 'Software Engineer Intern',
    companyId: 'company-001',
    companyName: 'TechCorp Solutions',
    startDate: '2024-01-08',
    endDate: '2024-04-08',
    status: 'active',
    totalRequiredHours: 480,
    stipend: '₹60,000/mo',
    facultyId: 'fac-001', // faculty assigned to this student
  },
  {
    studentId: 'stu-002',
    studentName: 'Priya Nair',
    rollNumber: '20CS024',
    department: 'Computer Science',
    year: 'Final Year',
    jobId: 2,
    jobTitle: 'Data Scientist Intern',
    companyId: 'company-001',
    companyName: 'TechCorp Solutions',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    status: 'active',
    totalRequiredHours: 480,
    stipend: '₹55,000/mo',
    facultyId: 'fac-001',
  },
  {
    studentId: 'stu-003',
    studentName: 'Rohan Mehta',
    rollNumber: '20EC012',
    department: 'Electronics',
    year: 'Third Year',
    jobId: 3,
    jobTitle: 'Product Manager Intern',
    companyId: 'company-001',
    companyName: 'TechCorp Solutions',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    status: 'active',
    totalRequiredHours: 480,
    stipend: '₹50,000/mo',
    facultyId: 'fac-002',
  },
  {
    studentId: 'stu-004',
    studentName: 'Sneha Patel',
    rollNumber: '20ME005',
    department: 'Mechanical',
    year: 'Final Year',
    jobId: 4,
    jobTitle: 'Operations Intern',
    companyId: 'company-001',
    companyName: 'TechCorp Solutions',
    startDate: '2024-01-12',
    endDate: '2024-04-12',
    status: 'active',
    totalRequiredHours: 480,
    stipend: '₹45,000/mo',
    facultyId: 'fac-001',
  },
  {
  studentId: 'stu-005',
  studentName: 'Neha Sharma',
  rollNumber: '20CS078',
  department: 'Computer Science',
  year: 'Final Year',
  jobId: 5,
  jobTitle: 'Software Engineer Intern',
  companyId: 'company-002',
  companyName: 'Google',
  startDate: '2023-06-01',
  endDate: '2023-08-31',
  status: 'completed',      // completed internship
  totalRequiredHours: 480,
  stipend: '₹80,000/mo',
  facultyId: 'fac-001',
},
];

// Mock attendance (unchanged)
const initialAttendance = [
  // ... (same as before)
  { id: 1, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(0), hoursWorked: 8, status: 'present', task: 'API integration and code review', loggedBy: 'TechCorp Solutions' },
  { id: 2, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(1), hoursWorked: 8, status: 'present', task: 'Frontend component development', loggedBy: 'TechCorp Solutions' },
  { id: 3, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(2), hoursWorked: 4, status: 'half-day', task: 'Sprint planning meeting', loggedBy: 'TechCorp Solutions' },
  { id: 4, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(3), hoursWorked: 8, status: 'present', task: 'Database schema design', loggedBy: 'TechCorp Solutions' },
  { id: 5, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(4), hoursWorked: 0, status: 'absent', task: '-', loggedBy: 'TechCorp Solutions' },
  { id: 6, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(7), hoursWorked: 8, status: 'present', task: 'Unit testing and documentation', loggedBy: 'TechCorp Solutions' },
  { id: 7, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(8), hoursWorked: 8, status: 'present', task: 'Bug fixes and deployment', loggedBy: 'TechCorp Solutions' },
  { id: 8, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(9), hoursWorked: 8, status: 'present', task: 'Code review & CI/CD setup', loggedBy: 'TechCorp Solutions' },
  { id: 9, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(10), hoursWorked: 8, status: 'present', task: 'Feature implementation', loggedBy: 'TechCorp Solutions' },
  { id: 10, studentId: 'stu-001', studentName: 'Arjun Sharma', date: daysAgo(14), hoursWorked: 8, status: 'present', task: 'Onboarding and setup', loggedBy: 'TechCorp Solutions' },
  { id: 11, studentId: 'stu-002', studentName: 'Priya Nair', date: daysAgo(0), hoursWorked: 8, status: 'present', task: 'Data pipeline development', loggedBy: 'TechCorp Solutions' },
  { id: 12, studentId: 'stu-002', studentName: 'Priya Nair', date: daysAgo(1), hoursWorked: 8, status: 'present', task: 'Model training and evaluation', loggedBy: 'TechCorp Solutions' },
  { id: 13, studentId: 'stu-002', studentName: 'Priya Nair', date: daysAgo(2), hoursWorked: 8, status: 'present', task: 'Dashboard creation', loggedBy: 'TechCorp Solutions' },
  { id: 14, studentId: 'stu-002', studentName: 'Priya Nair', date: daysAgo(3), hoursWorked: 0, status: 'absent', task: '-', loggedBy: 'TechCorp Solutions' },
  { id: 15, studentId: 'stu-002', studentName: 'Priya Nair', date: daysAgo(7), hoursWorked: 8, status: 'present', task: 'Data cleaning and EDA', loggedBy: 'TechCorp Solutions' },
  { id: 16, studentId: 'stu-003', studentName: 'Rohan Mehta', date: daysAgo(0), hoursWorked: 8, status: 'present', task: 'Product roadmap planning', loggedBy: 'TechCorp Solutions' },
  { id: 17, studentId: 'stu-003', studentName: 'Rohan Mehta', date: daysAgo(1), hoursWorked: 4, status: 'half-day', task: 'Stakeholder interviews', loggedBy: 'TechCorp Solutions' },
  { id: 18, studentId: 'stu-003', studentName: 'Rohan Mehta', date: daysAgo(2), hoursWorked: 8, status: 'present', task: 'Feature specs writing', loggedBy: 'TechCorp Solutions' },
  { id: 19, studentId: 'stu-004', studentName: 'Sneha Patel', date: daysAgo(0), hoursWorked: 8, status: 'present', task: 'Supply chain analysis', loggedBy: 'TechCorp Solutions' },
  { id: 20, studentId: 'stu-004', studentName: 'Sneha Patel', date: daysAgo(1), hoursWorked: 8, status: 'present', task: 'Process optimization report', loggedBy: 'TechCorp Solutions' },
];

// Mock reports
const initialReports = [
  {
    id: 'rep-1',
    studentId: 'stu-001',
    studentName: 'Arjun Sharma',
    date: '2024-03-01',
    title: 'Initial Setup',
    description: 'Set up development environment and reviewed project documentation.',
    hours: 4,
    tasks: 'Environment setup, documentation review',
  },
  {
    id: 'rep-2',
    studentId: 'stu-001',
    studentName: 'Arjun Sharma',
    date: '2024-03-02',
    title: 'Feature Implementation',
    description: 'Started implementing login page UI.',
    hours: 6,
    tasks: 'UI design, React components',
  },
  {
    id: 'rep-3',
    studentId: 'stu-002',
    studentName: 'Priya Nair',
    date: '2024-03-01',
    title: 'Data Exploration',
    description: 'Analyzed the dataset and prepared preliminary visualizations.',
    hours: 5,
    tasks: 'Data cleaning, exploratory analysis',
  },
];

const SharedDataContext = createContext(undefined);

export const useSharedData = () => {
  const ctx = useContext(SharedDataContext);
  if (!ctx) throw new Error('useSharedData must be used within SharedDataProvider');
  return ctx;
};

export const SharedDataProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [reports, setReports] = useState(initialReports);

  // Attendance functions
  const addAttendance = (record) => {
    const newRecord = { ...record, id: Date.now() };
    setAttendance(prev => [newRecord, ...prev]);
  };
  const updateAttendance = (id, updates) => {
    setAttendance(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };
  const deleteAttendance = (id) => {
    setAttendance(prev => prev.filter(r => r.id !== id));
  };
  const getStudentAttendance = (studentId) =>
    attendance.filter(r => r.studentId === studentId).sort((a, b) => b.date.localeCompare(a.date));
  const getStudentHours = (studentId) =>
    attendance.filter(r => r.studentId === studentId).reduce((sum, r) => sum + r.hoursWorked, 0);
  const getAttendanceRate = (studentId) => {
    const records = attendance.filter(r => r.studentId === studentId);
    if (!records.length) return 0;
    const present = records.filter(r => r.status === 'present' || r.status === 'half-day').length;
    return Math.round((present / records.length) * 100);
  };
  const getStudentAssignment = (studentId) =>
    assignments.find(a => a.studentId === studentId);

  // Assignment functions
  const addAssignment = (assignment) => {
    setAssignments(prev => [...prev, assignment]);
  };
  const updateAssignment = (studentId, updates) => {
    setAssignments(prev => prev.map(a => a.studentId === studentId ? { ...a, ...updates } : a));
  };

  // Report functions
  const addReport = (studentId, reportData) => {
    const student = assignments.find(a => a.studentId === studentId);
    const newReport = {
      id: Date.now().toString(),
      studentId,
      studentName: student?.studentName || 'Unknown',
      ...reportData,
    };
    setReports(prev => [newReport, ...prev]);
  };
  const getStudentReports = (studentId) =>
    reports.filter(r => r.studentId === studentId);
  const getFacultyReports = (facultyId) => {
    const studentIds = assignments
      .filter(a => a.facultyId === facultyId)
      .map(a => a.studentId);
    return reports.filter(r => studentIds.includes(r.studentId));
  };
  const getAllReports = () => reports;

  return (
    <SharedDataContext.Provider
      value={{
        assignments,
        attendance,
        reports,
        addAttendance,
        updateAttendance,
        deleteAttendance,
        addAssignment,
        updateAssignment,
        getStudentAttendance,
        getStudentHours,
        getAttendanceRate,
        getStudentAssignment,
        addReport,
        getStudentReports,
        getFacultyReports,
        getAllReports,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};