import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap,
  Award, Star, FileText, Edit3, Upload, CheckCircle, Clock, XCircle,
  TrendingUp, Target, MessageSquare, Link, Github, Linkedin, Globe,
  Shield, Building, Users, BookOpen, Trophy, Download, Plus, X,
  ChevronRight, Camera, BarChart2, Zap, Code, Database, Palette,
  ToggleRight, Save, Eye, EyeOff, Timer, AlertTriangle, CalendarCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSharedData } from '../contexts/SharedDataContext';

// ── Mock Data ────────────────────────────────────────────────────────────────

const studentProfile = {
  name: 'Arjun Sharma',
  initials: 'AS',
  email: 'arjun.sharma@college.edu',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  college: 'IIT Bombay',
  department: 'Computer Science & Engineering',
  year: '4th Year (Final)',
  cgpa: 8.7,
  bio: 'Passionate software engineer with a strong foundation in full-stack development and machine learning. Actively seeking impactful internship opportunities in product-driven tech companies.',
  profileCompletion: 82,
  joinedDate: 'August 2021',
  github: 'github.com/arjunsharma',
  linkedin: 'linkedin.com/in/arjunsharma',
  portfolio: 'arjunsharma.dev',
  skills: [
    { name: 'React.js', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Python', level: 85, category: 'Language' },
    { name: 'Machine Learning', level: 70, category: 'AI/ML' },
    { name: 'PostgreSQL', level: 75, category: 'Database' },
    { name: 'Docker', level: 60, category: 'DevOps' },
    { name: 'TypeScript', level: 82, category: 'Language' },
    { name: 'UI/UX Design', level: 55, category: 'Design' },
  ],
  stats: [
    { label: 'Applications', value: 12, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Interviews', value: 4, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Offers', value: 1, icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Profile Views', value: 78, icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
  ],
  applications: [
    { company: 'Google', role: 'SWE Intern', status: 'interview', date: '2024-01-20', stipend: '₹1,20,000/mo', type: 'Internship' },
    { company: 'Microsoft', role: 'Product Intern', status: 'pending', date: '2024-01-18', stipend: '₹80,000/mo', type: 'Internship' },
    { company: 'Flipkart', role: 'Backend Intern', status: 'accepted', date: '2024-01-10', stipend: '₹60,000/mo', type: 'Internship' },
    { company: 'Goldman Sachs', role: 'Tech Analyst', status: 'rejected', date: '2024-01-05', stipend: '₹1,00,000/mo', type: 'Full-time' },
    { company: 'Zomato', role: 'Data Engineer', status: 'pending', date: '2024-01-22', stipend: '₹70,000/mo', type: 'Internship' },
  ],
  badges: [
    { name: 'Early Bird', icon: '🌅', desc: 'First to apply this semester', color: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200' },
    { name: 'Top Performer', icon: '🏆', desc: 'Top 10% CGPA in batch', color: 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200' },
    { name: 'Verified Profile', icon: '✅', desc: 'All documents verified', color: 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200' },
    { name: 'Resume Star', icon: '⭐', desc: 'Resume rated 95/100', color: 'bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-200' },
  ],
  certificates: [
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Dec 2023', credentialId: 'AWS-CP-12345' },
    { name: 'Google Data Analytics', issuer: 'Google', date: 'Oct 2023', credentialId: 'GDA-67890' },
    { name: 'Internship Completion', issuer: 'Razorpay', date: 'Aug 2023', credentialId: 'RAZ-INT-2023' },
  ],
  leaderboard: { rank: 14, totalStudents: 1200, percentile: 98.8 },
};

const companyProfile = {
  name: 'Priya Mehta',
  initials: 'PM',
  email: 'priya.mehta@techcorp.com',
  phone: '+91 98000 11222',
  location: 'Bangalore, Karnataka',
  company: 'TechCorp Solutions',
  designation: 'Senior Recruiter',
  department: 'Talent Acquisition',
  bio: 'Experienced recruiter with 6 years in campus hiring. Specialized in tech roles across software engineering, data science, and product management.',
  profileCompletion: 90,
  joinedDate: 'March 2022',
  linkedin: 'linkedin.com/in/priyamehta',
  skills: [
    { name: 'Candidate Sourcing', level: 95, category: 'Recruitment' },
    { name: 'Technical Assessment', level: 85, category: 'Recruitment' },
    { name: 'Campus Relations', level: 90, category: 'Relations' },
    { name: 'ATS Systems', level: 80, category: 'Tools' },
  ],
  stats: [
    { label: 'Active Jobs', value: 8, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Applications', value: 156, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Hired', value: 12, icon: CheckCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Colleges', value: 24, icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' },
  ],
};

const adminProfile = {
  name: 'System Administrator',
  initials: 'SA',
  email: 'admin@ccsconnect.in',
  phone: '+91 00000 00000',
  location: 'Pan India',
  designation: 'System Admin',
  bio: 'Managing the CCSconnect platform operations, user management, and system configurations.',
  profileCompletion: 100,
  joinedDate: 'January 2023',
  stats: [
    { label: 'Total Users', value: 4800, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Colleges', value: 28, icon: Building, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Companies', value: 312, icon: Briefcase, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Placements', value: 5600, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  ],
};
// ── Helper ───────────────────────────────────────────────────────────────────

const getStatusStyle = (status) => {
  switch (status) {
    case 'accepted': return { bg: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', icon: <CheckCircle className="w-3 h-3" />, label: 'Accepted' };
    case 'interview': return { bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', icon: <Calendar className="w-3 h-3" />, label: 'Interview' };
    case 'pending': return { bg: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', icon: <Clock className="w-3 h-3" />, label: 'Pending' };
    case 'rejected': return { bg: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', icon: <XCircle className="w-3 h-3" />, label: 'Rejected' };
    default: return { bg: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: null, label: status };
  }
};

const skillCategoryIcon = (cat) => {
  switch (cat) {
    case 'Frontend': return <Palette className="w-3 h-3" />;
    case 'Backend': return <Database className="w-3 h-3" />;
    case 'Language': return <Code className="w-3 h-3" />;
    case 'AI/ML': return <Zap className="w-3 h-3" />;
    case 'DevOps': return <ToggleRight className="w-3 h-3" />;
    default: return <Star className="w-3 h-3" />;
  }
};

// ── Main Component ────────────────────────────────────────────────────────────

export const ProfilePage = ({ userRole = 'student' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const { assignments, getStudentAttendance, getStudentHours, getAttendanceRate, getStudentAssignment } = useSharedData();
  const myStudentId = 'stu-001';
  const myAttendance = getStudentAttendance(myStudentId);
  const myHours = getStudentHours(myStudentId);
  const myRate = getAttendanceRate(myStudentId);
  const myAssignment = getStudentAssignment(myStudentId);

  const getProfile = () => {
    switch (userRole) {
      case 'company': return companyProfile;
      case 'admin': return adminProfile;
      default: return studentProfile;
    }
  };

  const profile = getProfile();
  const isStudent = userRole === 'student';

  const getRoleBadgeStyle = () => {
    switch (userRole) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case 'company': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'college': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
      case 'alumni': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'admin': return 'Admin';
      case 'company': return 'Company Recruiter';
      default: return 'Student';
    }
  };

  // Compute internship statistics for admin/company
  const internshipStats = (() => {
    if (userRole === 'admin') {
      const facultyId = 'fac-001'; // Replace with actual faculty ID from auth later
      const facultyAssignments = assignments.filter(a => a.facultyId === facultyId);
      const total = facultyAssignments.length;
      const successful = facultyAssignments.filter(a => a.status === 'completed').length;
      const successRate = total > 0 ? Math.round((successful / total) * 100) : 0;
      return { total, successful, successRate };
    } else if (userRole === 'company') {
      const companyId = 'company-001'; // Replace with actual company ID from auth later
      const companyAssignments = assignments.filter(a => a.companyId === companyId);
      const total = companyAssignments.length;
      const successful = companyAssignments.filter(a => a.status === 'completed').length;
      const successRate = total > 0 ? Math.round((successful / total) * 100) : 0;
      return { total, successful, successRate };
    }
    return null;
  })();

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Cover Photo */}
      <div className="relative h-52 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1770208741251-0fe9609459d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9maWxlJTIwY292ZXIlMjBhYnN0cmFjdCUyMGdyYXl8ZW58MXx8fHwxNzczNjcwNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/60" />
        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all">
          <Camera className="w-4 h-4" />
          Change Cover
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Profile Header Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl -mt-16 mb-8 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0 self-start sm:self-end">
  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-2xl border-4 border-white dark:border-gray-700 shadow-lg flex items-center justify-center">
    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{profile.initials}</span>
  </div>
  {/* Camera button - repositioned */}
  <button 
    className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors border-2 border-white dark:border-gray-700"
    style={{ transform: 'translate(10%, 10%)' }}
  >
    <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
  </button>
</div>

            {/* Identity */}
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeStyle()}`}>
                  {getRoleLabel()}
                </span>
                {profile.profileCompletion === 100 && (
                  <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full border border-green-200 dark:border-green-700">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-2">
                {profile.designation || profile.year || ''}
                {(profile.college || profile.company) && (
                  <span className="text-gray-400 dark:text-gray-500"> · </span>
                )}
                {profile.college || profile.company || ''}
              </p>
              {profile.currentRole && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {profile.currentRole}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {profile.joinedDate}</span>
                {profile.department && (
                  <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" />{profile.department}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  editMode
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                {editMode ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
              </button>
              {isStudent && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                  <Download className="w-4 h-4" /> Resume
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-1 mb-8 flex-wrap h-auto gap-1">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <User className="w-4 h-4 mr-2" /> Overview
            </TabsTrigger>
            {isStudent && (
              <TabsTrigger value="applications" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
                <FileText className="w-4 h-4 mr-2" /> Applications
              </TabsTrigger>
            )}
            {(userRole === 'student' || userRole === 'alumni') && (
              <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
                <Code className="w-4 h-4 mr-2" /> Skills {userRole === 'student' ? '& Resume' : ''}
              </TabsTrigger>
            )}
            {isStudent && (
              <TabsTrigger value="achievements" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
                <Trophy className="w-4 h-4 mr-2" /> Achievements
              </TabsTrigger>
            )}
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Info
            </TabsTrigger>
          </TabsList>

          {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" /> About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <textarea
                        defaultValue={profile.bio}
                        rows={4}
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 resize-none bg-white dark:bg-gray-700"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Skills Preview */}
                {profile.skills && userRole !== 'admin' && (
                  <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Top Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 6).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {profile.skills.length > 6 && (
                          <button
                            onClick={() => setActiveTab('skills')}
                            className="px-3 py-1 bg-gray-800 dark:bg-gray-700 text-white rounded-full text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                          >
                            +{profile.skills.length - 6} more
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Student: Current Internship & Attendance */}
                {userRole === 'student' && myAssignment && (
                  <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <CalendarCheck className="w-5 h-5 text-gray-500 dark:text-gray-400" /> My Internship & Attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Internship banner */}
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <div>
                            <p className="text-sm text-gray-300 dark:text-gray-400">Current Internship</p>
                            <h4 className="font-bold text-lg">{myAssignment.jobTitle}</h4>
                            <p className="text-gray-400 text-sm">{myAssignment.companyName} · {myAssignment.stipend}</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300 border border-green-500/30">Active</Badge>
                        </div>
                        <div className="flex gap-4 text-sm mt-2 text-gray-300">
                          <span>📅 {myAssignment.startDate} → {myAssignment.endDate}</span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{myHours}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Hours Done</div>
                        </div>
                        <div className={`rounded-xl p-3 text-center ${myRate < 75 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
                          <div className={`text-2xl font-bold ${myRate < 75 ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>{myRate}%</div>
                          <div className={`text-xs ${myRate < 75 ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>Attendance</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center">
                          <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{Math.min(100, Math.round((myHours / myAssignment.totalRequiredHours) * 100))}%</div>
                          <div className="text-xs text-blue-500 dark:text-blue-400">Complete</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-1 flex justify-between text-xs text-gray-400 dark:text-gray-500">
                        <span>{myHours}h logged / {myAssignment.totalRequiredHours}h required</span>
                      </div>
                      <Progress value={Math.min(100, (myHours / myAssignment.totalRequiredHours) * 100)} className="h-2 mb-4" />

                      {myRate < 75 && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800 mb-4">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <p className="text-xs text-red-700 dark:text-red-400">Your attendance is below 75%. Please contact your faculty advisor.</p>
                        </div>
                      )}

                      {/* Recent logs */}
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Recent Attendance</p>
                      <div className="space-y-2">
                        {myAttendance.slice(0, 4).map(log => (
                          <div key={log.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'present' ? 'bg-green-500' : log.status === 'absent' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                            <span className="text-gray-400 dark:text-gray-500 w-24 flex-shrink-0 text-xs">{log.date}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                              log.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              log.status === 'absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                              'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>{log.status}</span>
                            <span className="text-gray-600 dark:text-gray-300 flex-1 truncate text-xs">{log.task}</span>
                            <span className="text-gray-400 dark:text-gray-500 text-xs flex items-center gap-0.5 flex-shrink-0"><Timer className="w-3 h-3" />{log.hoursWorked}h</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Contact Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
                        <p className="text-gray-700 dark:text-gray-300">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 dark:text-gray-500">Phone</p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-700 dark:text-gray-300">
                            {showPhone ? profile.phone : '••••• •••••'}
                          </p>
                          <button onClick={() => setShowPhone(!showPhone)}>
                            {showPhone ? <EyeOff className="w-3 h-3 text-gray-400 dark:text-gray-500" /> : <Eye className="w-3 h-3 text-gray-400 dark:text-gray-500" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Location</p>
                        <p className="text-gray-700 dark:text-gray-300">{profile.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Internship Statistics (Admin/Company) */}
                {internshipStats && (
                  <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Internship Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Interns</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{internshipStats.total}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Successful Interns</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{internshipStats.successful}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Success Rate</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{internshipStats.successRate}%</span>
                      </div>
                      <Progress value={internshipStats.successRate} className="h-2" />
                    </CardContent>
                  </Card>
                )}

                {/* Social Links */}
                {(profile.github || profile.linkedin || profile.portfolio) && (
                  <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Link className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Social Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {profile.github && (
                        <a href="#" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
                          <div className="w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Github className="w-4 h-4 text-white" />
                          </div>
                          <span className="group-hover:underline">{profile.github}</span>
                        </a>
                      )}
                      {profile.linkedin && (
                        <a href="#" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Linkedin className="w-4 h-4 text-white" />
                          </div>
                          <span className="group-hover:underline">{profile.linkedin}</span>
                        </a>
                      )}
                      {profile.portfolio && (
                        <a href="#" className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
                          <div className="w-8 h-8 bg-gray-600 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Globe className="w-4 h-4 text-white" />
                          </div>
                          <span className="group-hover:underline">{profile.portfolio}</span>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Student: Academic Info */}
                {isStudent && (
                  <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <GraduationCap className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Academics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">CGPA</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{studentProfile.cgpa}</span>
                          <span className="text-gray-400 dark:text-gray-500 text-sm">/ 10.0</span>
                        </div>
                      </div>
                      <Progress value={(studentProfile.cgpa / 10) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Batch Rank: <span className="font-semibold text-gray-700 dark:text-gray-300">14 / 240</span></span>
                        <span>Top <span className="font-semibold text-gray-700 dark:text-gray-300">6%</span></span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <div className="font-semibold text-gray-800 dark:text-gray-200">B.Tech</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Degree</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <div className="font-semibold text-gray-800 dark:text-gray-200">2025</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Graduation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Spacer for bottom margin */}
                <div className="h-8"></div>
              </div>
            </div>
          </TabsContent>

          {/* ── APPLICATIONS TAB ─────────────────────────────────────────── */}
{isStudent && (
  <TabsContent value="applications" className="mb-8">  {/* 👈 Added bottom margin */}
    <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" /> All Applications
          </CardTitle>
          <span className="text-sm text-gray-500 dark:text-gray-400">{studentProfile.applications.length} total</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {studentProfile.applications.map((app, i) => {
            const s = getStatusStyle(app.status);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-600 rounded-lg shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm border border-gray-200 dark:border-gray-600">
                    {app.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{app.role}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{app.company} · {app.type}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Applied: {app.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{app.stipend}</span>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${s.bg}`}>
                    {s.icon} {s.label}
                  </span>
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  </TabsContent>
)}

          {/* ── SKILLS & RESUME TAB ──────────────────────────────────────── */}
{(userRole === 'student' || userRole === 'alumni') && (
  <TabsContent value="skills" className="mb-8">  {/* 👈 Added bottom margin */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Skills */}
      {profile.skills && (
        <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Skills & Proficiency
              </CardTitle>
              {editMode && (
                <button className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.skills.map((skill, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {skillCategoryIcon(skill.category)}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{skill.category}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
                {/* Resume & Documents */}
{isStudent && (
  <div className="space-y-6">
    <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Resume / CV
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:border-gray-400 dark:hover:border-gray-600 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
            <Upload className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">Arjun_Sharma_Resume_2024.pdf</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Last updated: Jan 15, 2024 · 245 KB</p>
          <div className="flex justify-center gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" /> Replace
            </button>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <Target className="w-4 h-4 flex-shrink-0" />
            Your resume has been viewed by <strong>24 recruiters</strong> this month
          </p>
        </div>
      </CardContent>
    </Card>

    {/* Projects Card - added mb-8 for bottom spacing */}
    <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { name: 'AI Placement Predictor', tech: 'Python · TensorFlow · React', stars: 42 },
          { name: 'Campus Connect App', tech: 'React Native · Node.js · MongoDB', stars: 27 },
          { name: 'Smart Resume Parser', tech: 'NLP · FastAPI · PostgreSQL', stars: 18 },
        ].map((proj, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{proj.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{proj.tech}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">{proj.stars}</span>
            </div>
          </div>
        ))}
        <button className="w-full mt-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </CardContent>
    </Card>
  </div>
)}
              </div>
            </TabsContent>
          )}

          {/* ── ACHIEVEMENTS TAB ──────────────────── */}
          {isStudent && (
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Badges */}
                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Award className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Badges Earned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {studentProfile.badges.map((badge, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className={`p-4 rounded-xl border-2 ${badge.color} text-center`}
                        >
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{badge.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{badge.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certificates */}
<Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-8">
  <CardHeader className="pb-3">
    <CardTitle className="text-base flex items-center gap-2">
      <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Certificates
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    {studentProfile.certificates.map((cert, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <div className="w-10 h-10 bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex items-center justify-center flex-shrink-0">
          <Award className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{cert.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer} · {cert.date}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">{cert.credentialId}</p>
        </div>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0">
          <Download className="w-4 h-4" />
        </button>
      </motion.div>
    ))}
    <button className="w-full mt-2 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-all">
      <Plus className="w-4 h-4" /> Add Certificate
    </button>
  </CardContent>
</Card>
              </div>
            </TabsContent>
          )}

          {/* ── SETTINGS TAB ─────────────────────────────────────────────── */}
          <TabsContent value="settings">
            <div className="max-w-2xl space-y-6">
              <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Full Name</label>
                      <Input defaultValue={profile.name} className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Email</label>
                      <Input defaultValue={profile.email} type="email" className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Phone</label>
                      <Input defaultValue={profile.phone} className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Location</label>
                      <Input defaultValue={profile.location} className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                    </div>
                  </div>
                  {profile.department && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Department</label>
                        <Input defaultValue={profile.department} className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                      </div>
                      {profile.year && (
                        <div>
                          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Year / Status</label>
                          <Input defaultValue={profile.year} className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5">Bio</label>
                    <textarea
                      defaultValue={profile.bio}
                      rows={3}
                      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 resize-none bg-white dark:bg-gray-700"
                    />
                  </div>
                </CardContent>
              </Card>

              {(profile.github || profile.linkedin) && (
                <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Link className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Social & Portfolio Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5 flex items-center gap-2">
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </label>
                      <Input defaultValue={profile.github || ''} placeholder="github.com/username" className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5 flex items-center gap-2">
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </label>
                      <Input defaultValue={profile.linkedin || ''} placeholder="linkedin.com/in/username" className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                    </div>
                    {profile.portfolio && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-1.5 flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5" /> Portfolio Website
                        </label>
                        <Input defaultValue={profile.portfolio} placeholder="yoursite.com" className="border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-gray-400" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Privacy & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Show profile to recruiters', desc: 'Allow companies to discover your profile', enabled: true },
                    { label: 'Email notifications', desc: 'Receive updates about applications', enabled: true },
                    { label: 'Show phone number', desc: 'Visible to verified recruiters only', enabled: false },
                    { label: 'Mentor availability', desc: 'Allow students to request mentorship', enabled: userRole === 'alumni' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{item.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${item.enabled ? 'bg-gray-800 dark:bg-gray-700' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white dark:bg-gray-300 rounded-full shadow transition-transform ${item.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <button className="w-full py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium mb-8">
                <Save className="w-5 h-5" /> Save All Changes
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};