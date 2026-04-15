import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, Briefcase, TrendingUp, Bell, FileText, Building,
  CheckCircle, Clock, Shield, Plus, Edit, Trash2, Search,
  Filter, BarChart3, GraduationCap, Calendar, ChevronDown,
  ChevronUp, AlertTriangle, Star, Timer, Eye, UserCheck, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { useSharedData } from '../contexts/SharedDataContext';

// Mock data
const mockNotices = [
  { id: 1, title: 'Google Summer Internship 2024 — Applications Open', content: 'Google is now accepting applications for their Summer 2024 internship program. Eligible: Final year CSE/IT/ECE students with CGPA ≥ 8.0.', type: 'internship', pinned: true, start_date: '2024-01-01', end_date: '2024-03-15', created_by: 'Admin', created_at: '2024-01-01T10:00:00Z' },
  { id: 2, title: 'Microsoft Campus Placement Drive', content: 'Microsoft campus placement drive is scheduled for January 2024. Roles: SWE, PM, Data Analyst.', type: 'placement', pinned: true, start_date: '2024-01-05', end_date: '2024-02-20', created_by: 'Admin', created_at: '2024-01-05T09:00:00Z' },
  { id: 3, title: 'Career Fair 2024', content: 'Annual career fair with 50+ companies attending. All students eligible to participate.', type: 'workshop', pinned: false, start_date: '2024-02-01', end_date: '2024-02-28', created_by: 'Admin', created_at: '2024-01-10T11:00:00Z' },
];

const mockUsers = [
  { id: 1, name: 'Arjun Sharma', email: 'arjun@college.edu', role: 'student', status: 'active', joinDate: '2023-09-01' },
  { id: 2, name: 'TechCorp Solutions', email: 'hr@techcorp.com', role: 'company', status: 'active', joinDate: '2023-10-15' },
  { id: 3, name: 'Priya Nair', email: 'priya@college.edu', role: 'student', status: 'active', joinDate: '2023-09-01' },
  { id: 4, name: 'InnovateLabs', email: 'contact@innovlabs.com', role: 'company', status: 'pending', joinDate: '2024-01-10' },
  { id: 5, name: 'Dr. Ramesh Kumar', email: 'ramesh@iitb.ac.in', role: 'college', status: 'active', joinDate: '2022-06-01' },
  { id: 6, name: 'Neha Gupta', email: 'neha@google.com', role: 'alumni', status: 'active', joinDate: '2023-07-15' },
];

const getStatusColor = (status) => {
  const m = { 
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', 
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', 
    inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', 
    accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', 
    interview: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', 
    completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', 
    terminated: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
  };
  return m[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
};

const getTypeColor = (type) => {
  const m = { 
    internship: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 
    placement: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', 
    project: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', 
    apprenticeship: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300', 
    workshop: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300', 
    assessment: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
  };
  return m[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
};

export const AdminDashboard = () => {
  const { assignments, attendance, getStudentHours, getAttendanceRate, getStudentAttendance, getFacultyReports } = useSharedData();

  const currentFacultyId = 'fac-001'; // Replace with actual from auth
  const facultyReports = getFacultyReports(currentFacultyId);
  const successfulInterns = assignments.filter(a => a.status === 'completed').length;

  const mockAdminStats = [
    { label: 'Total Users', value: 2547, icon: Users, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30', change: '+12%' },
    { label: 'Active Companies', value: 156, icon: Building, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30', change: '+8%' },
    { label: 'Job Postings', value: 342, icon: Briefcase, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30', change: '+15%' },
    { label: 'Placed Students', value: 1089, icon: GraduationCap, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800', change: '+5%' },
    { label: 'Successful Interns', value: successfulInterns, icon: Award, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30', change: '+5%' },
  ];

  const [notices, setNotices] = useState(mockNotices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'internship', pinned: false, start_date: '', end_date: '' });

  const handleCreateNotice = () => {
    if (!newNotice.title || !newNotice.content || !newNotice.start_date || !newNotice.end_date) {
      toast.error('Please fill in all required fields'); return;
    }
    const notice = { id: Date.now(), ...newNotice, created_by: 'Admin', created_at: new Date().toISOString() };
    setNotices([notice, ...notices]);
    setIsDialogOpen(false);
    setNewNotice({ title: '', content: '', type: 'internship', pinned: false, start_date: '', end_date: '' });
    toast.success('Notice created successfully');
  };

  const handleEditNotice = (notice) => {
    setEditingNotice(notice);
    setNewNotice({ title: notice.title, content: notice.content, type: notice.type, pinned: notice.pinned, start_date: notice.start_date, end_date: notice.end_date });
    setIsDialogOpen(true);
  };

  const handleUpdateNotice = () => {
    if (!editingNotice) return;
    setNotices(notices.map(n => n.id === editingNotice.id ? { ...n, ...newNotice } : n));
    setIsDialogOpen(false);
    setEditingNotice(null);
    setNewNotice({ title: '', content: '', type: 'internship', pinned: false, start_date: '', end_date: '' });
    toast.success('Notice updated');
  };

  const filteredNotices = notices.filter(n => {
    const ms = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const mt = filterType === 'all' || n.type === filterType;
    return ms && mt;
  });

  const departments = ['all', ...new Set(assignments.map(a => a.department))];
  const filteredAssignments = assignments.filter(a => {
    const ms = a.studentName.toLowerCase().includes(studentSearch.toLowerCase()) || a.rollNumber.toLowerCase().includes(studentSearch.toLowerCase()) || a.companyName.toLowerCase().includes(studentSearch.toLowerCase());
    const md = filterDept === 'all' || a.department === filterDept;
    return ms && md;
  });

  const totalActiveInterns = assignments.filter(a => a.status === 'active').length;
  const avgAttendance = assignments.length
    ? Math.round(assignments.reduce((s, a) => s + getAttendanceRate(a.studentId), 0) / assignments.length)
    : 0;
  const lowAttendanceCount = assignments.filter(a => getAttendanceRate(a.studentId) < 75).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      {/* Header */}
      <motion.div className="mb-6 sm:mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-800 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Admin / Faculty Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage notices, users, and track student internship progress</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {mockAdminStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-3 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value.toLocaleString()}</p>
                        <Badge variant="outline" className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-800 text-xs">{stat.change}</Badge>
                      </div>
                    </div>
                    <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs - horizontally scrollable on mobile */}
      <Tabs defaultValue="students" className="space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 h-auto inline-flex min-w-max gap-1">
            <TabsTrigger value="students" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <GraduationCap className="w-4 h-4 mr-2" /> Student Progress
            </TabsTrigger>
            <TabsTrigger value="notices" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <Bell className="w-4 h-4 mr-2" /> Notices
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <Users className="w-4 h-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="applications" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <FileText className="w-4 h-4 mr-2" /> Applications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <BarChart3 className="w-4 h-4 mr-2" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <FileText className="w-4 h-4 mr-2" /> Student Reports
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── STUDENT PROGRESS TAB ── */}
        <TabsContent value="students" className="space-y-6">
          {/* Summary bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Card className="border-0 shadow-md bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white">
              <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">{totalActiveInterns}</div>
                  <div className="text-gray-300 text-xs sm:text-sm">Active Interns</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{avgAttendance}%</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Avg Attendance Rate</div>
                </div>
              </CardContent>
            </Card>
            <Card className={`border-0 shadow-md dark:bg-gray-800 dark:border-gray-700 ${lowAttendanceCount > 0 ? 'border-l-4 border-l-red-500' : ''}`}>
              <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                <AlertTriangle className={`w-6 h-6 sm:w-8 sm:h-8 ${lowAttendanceCount > 0 ? 'text-red-500' : 'text-gray-300 dark:text-gray-600'}`} />
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{lowAttendanceCount}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Below 75% Attendance</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search by name, roll no, company…" 
                value={studentSearch} 
                onChange={e => setStudentSearch(e.target.value)} 
                className="pl-9 dark:bg-gray-700 dark:border-gray-600" 
              />
            </div>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger className="w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600">
                <Filter className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {departments.map(d => <SelectItem key={d} value={d}>{d === 'all' ? 'All Departments' : d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Student Progress Cards */}
          <div className="space-y-4">
            {filteredAssignments.map((a, i) => {
              const totalHours = getStudentHours(a.studentId);
              const rate = getAttendanceRate(a.studentId);
              const pct = Math.min(100, Math.round((totalHours / a.totalRequiredHours) * 100));
              const isLow = rate < 75;
              const isExpanded = expandedStudent === a.studentId;
              const logs = getStudentAttendance(a.studentId);
              const presentDays = logs.filter(r => r.status === 'present').length;
              const halfDays = logs.filter(r => r.status === 'half-day').length;
              const absentDays = logs.filter(r => r.status === 'absent').length;

              return (
                <motion.div key={a.studentId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card className={`border-0 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${isLow ? 'border-l-4 border-l-red-400' : ''}`}>
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 ${isLow ? 'bg-red-600' : 'bg-gray-800 dark:bg-gray-700'}`}>
                            {a.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{a.studentName}</h3>
                              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{a.rollNumber}</span>
                              {isLow && <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Low Attendance</Badge>}
                              <Badge className={getStatusColor(a.status)}>{a.status}</Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{a.department} · {a.year}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{a.jobTitle} at {a.companyName}</p>
                          </div>
                        </div>

                        <div className="flex gap-4 text-center flex-shrink-0 justify-around sm:justify-end">
                          <div>
                            <div className={`text-lg sm:text-xl font-bold ${isLow ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>{rate}%</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">Attendance</div>
                          </div>
                          <div>
                            <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{totalHours}h</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">Hours</div>
                          </div>
                          <div>
                            <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{pct}%</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">Complete</div>
                          </div>
                        </div>

                        <button onClick={() => setExpandedStudent(isExpanded ? null : a.studentId)} className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors self-end sm:self-center">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
                          <span>Hours: {totalHours} / {a.totalRequiredHours}</span>
                          <span>{a.startDate} → {a.endDate}</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${isLow ? 'bg-red-400' : 'bg-gradient-to-r from-gray-500 to-gray-800 dark:from-gray-500 dark:to-gray-700'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          />
                        </div>
                      </div>

                      {isExpanded && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Attendance Breakdown</p>
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2 sm:p-3 text-center border border-green-100 dark:border-green-800">
                                  <div className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-400">{presentDays}</div>
                                  <div className="text-xs text-green-600 dark:text-green-500">Present</div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-2 sm:p-3 text-center border border-yellow-100 dark:border-yellow-800">
                                  <div className="text-lg sm:text-xl font-bold text-yellow-700 dark:text-yellow-400">{halfDays}</div>
                                  <div className="text-xs text-yellow-600 dark:text-yellow-500">Half Day</div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-2 sm:p-3 text-center border border-red-100 dark:border-red-800">
                                  <div className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-400">{absentDays}</div>
                                  <div className="text-xs text-red-600 dark:text-red-500">Absent</div>
                                </div>
                              </div>

                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-sm space-y-1">
                                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Stipend</span><span className="font-semibold text-gray-800 dark:text-gray-200">{a.stipend}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Company</span><span className="font-semibold text-gray-800 dark:text-gray-200">{a.companyName}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Role</span><span className="font-semibold text-gray-800 dark:text-gray-200">{a.jobTitle}</span></div>
                              </div>

                              {isLow && (
                                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-100 dark:border-red-800">
                                  <p className="text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    Attendance below 75%. Faculty action may be required.
                                  </p>
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Activity</p>
                              <div className="space-y-2 max-h-52 overflow-y-auto">
                                {logs.slice(0, 6).map(log => (
                                  <div key={log.id} className="flex items-center gap-2 text-xs p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'present' ? 'bg-green-500' : log.status === 'absent' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                    <span className="text-gray-400 dark:text-gray-500 w-20 sm:w-24 flex-shrink-0">{log.date}</span>
                                    <span className="text-gray-600 dark:text-gray-300 flex-1 truncate">{log.task}</span>
                                    <span className="text-gray-400 dark:text-gray-500 flex-shrink-0 flex items-center gap-0.5"><Timer className="w-3 h-3" />{log.hoursWorked}h</span>
                                  </div>
                                ))}
                                {logs.length === 0 && <p className="text-xs text-gray-400 dark:text-gray-500">No logs yet</p>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
            {filteredAssignments.length === 0 && (
              <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="py-16 text-center text-gray-400 dark:text-gray-500">
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No students found matching your search</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ── NOTICES TAB (responsive) ── */}
        <TabsContent value="notices" className="space-y-6">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="dark:text-gray-100 text-lg sm:text-xl">Notice Management</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-sm">Create, edit, and manage all campus notices</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" /> Create Notice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-2xl dark:bg-gray-800 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="dark:text-gray-100">{editingNotice ? 'Edit Notice' : 'Create New Notice'}</DialogTitle>
                      <DialogDescription className="dark:text-gray-400">{editingNotice ? 'Update notice details' : 'Fill in the details to create a new notice'}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label className="dark:text-gray-300">Title *</Label>
                        <Input value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} placeholder="Enter notice title" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label className="dark:text-gray-300">Content *</Label>
                        <Textarea value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} rows={4} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="dark:text-gray-300">Type *</Label>
                          <Select value={newNotice.type} onValueChange={v => setNewNotice({ ...newNotice, type: v })}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="internship">Internship</SelectItem>
                              <SelectItem value="placement">Placement</SelectItem>
                              <SelectItem value="project">Project</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="assessment">Assessment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="dark:text-gray-300">Pin Notice</Label>
                          <Select value={newNotice.pinned ? 'yes' : 'no'} onValueChange={v => setNewNotice({ ...newNotice, pinned: v === 'yes' })}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="yes">Yes — Pin to top</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="dark:text-gray-300">Start Date *</Label>
                          <Input type="date" value={newNotice.start_date} onChange={e => setNewNotice({ ...newNotice, start_date: e.target.value })} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div>
                          <Label className="dark:text-gray-300">End Date *</Label>
                          <Input type="date" value={newNotice.end_date} onChange={e => setNewNotice({ ...newNotice, end_date: e.target.value })} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</Button>
                      <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={editingNotice ? handleUpdateNotice : handleCreateNotice}>
                        {editingNotice ? 'Update' : 'Create'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search notices…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-44 dark:bg-gray-700 dark:border-gray-600">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="placement">Placement</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredNotices.map(notice => (
                  <motion.div key={notice.id} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{notice.title}</h3>
                          <Badge className={getTypeColor(notice.type)}>{notice.type}</Badge>
                          {notice.pinned && <Badge variant="outline" className="border-gray-500 text-gray-600 text-xs">📌 Pinned</Badge>}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">{notice.content}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-400">
                          <span>📅 {notice.start_date} → {notice.end_date}</span>
                          <span>👤 {notice.created_by}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0 self-end sm:self-start">
                        <Button size="sm" variant="ghost" onClick={() => { setNotices(notices.map(n => n.id === notice.id ? { ...n, pinned: !n.pinned } : n)); toast.success('Notice updated'); }}><Bell className={`w-4 h-4 ${notice.pinned ? 'fill-current text-gray-700 dark:text-gray-300' : ''}`} /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEditNotice(notice)}><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => { setNotices(notices.filter(n => n.id !== notice.id)); toast.success('Notice deleted'); }} className="text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── USERS TAB (responsive) ── */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="dark:text-gray-100">User Management</CardTitle>
              <CardDescription className="dark:text-gray-400">All registered users across the platform</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {mockUsers.map(user => (
                  <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 dark:bg-gray-600 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{user.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs capitalize dark:border-gray-600 dark:text-gray-300">{user.role}</Badge>
                          <span className="text-xs text-gray-400 dark:text-gray-500">Joined {user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      <Button size="sm" variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── APPLICATIONS TAB (responsive) ── */}
        <TabsContent value="applications" className="space-y-4">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="dark:text-gray-100">Application Overview</CardTitle>
              <CardDescription className="dark:text-gray-400">All student applications across the platform</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {[
                  { id: 1, student: 'Arjun Sharma', company: 'TechCorp', position: 'SWE Intern', status: 'accepted', date: '2024-01-20', dept: 'CS' },
                  { id: 2, student: 'Priya Nair', company: 'TechCorp', position: 'Data Scientist Intern', status: 'accepted', date: '2024-01-18', dept: 'CS' },
                  { id: 3, student: 'Rohan Mehta', company: 'TechCorp', position: 'PM Intern', status: 'interview', date: '2024-01-15', dept: 'EC' },
                  { id: 4, student: 'Sneha Patel', company: 'TechCorp', position: 'Operations Intern', status: 'accepted', date: '2024-01-22', dept: 'ME' },
                  { id: 5, student: 'Kiran Desai', company: 'Google', position: 'ML Intern', status: 'pending', date: '2024-01-25', dept: 'CS' },
                ].map(app => (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{app.student}</h3>
                        <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{app.dept}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{app.position} at {app.company}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Applied: {app.date}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── ANALYTICS TAB (responsive) ── */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3 p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base"><BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" /> User Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  {[
                    { label: 'Students', value: 1245, total: 2547 },
                    { label: 'Companies', value: 156, total: 2547 },
                    { label: 'Faculty/Admin', value: 256, total: 2547 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{item.value.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gray-700 dark:bg-gray-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${(item.value / item.total) * 100}%` }} transition={{ delay: i * 0.1, duration: 0.7 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3 p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Internship Analytics</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3">
                  {[
                    { label: 'Active Internships', value: totalActiveInterns },
                    { label: 'Completed This Year', value: 234 },
                    { label: 'Avg Hours / Student', value: Math.round(assignments.reduce((s, a) => s + getStudentHours(a.studentId), 0) / Math.max(assignments.length, 1)) + 'h' },
                    { label: 'Avg Attendance Rate', value: avgAttendance + '%' },
                    { label: 'Low Attendance Alerts', value: lowAttendanceCount },
                    { label: 'Placements This Semester', value: 67 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── STUDENT REPORTS TAB (responsive) ── */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="dark:text-gray-100">Student Daily Reports</CardTitle>
              <CardDescription className="dark:text-gray-400">Reports submitted by your assigned students</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {facultyReports.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">No reports submitted by your students yet.</p>
                ) : (
                  facultyReports.map(report => (
                    <div key={report.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{report.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">by {report.studentName}</p>
                        </div>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300 w-fit">{report.date}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{report.description}</p>
                      <div className="flex flex-wrap justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <span>Hours: {report.hours}h</span>
                        {report.tasks && <span>Tasks: {report.tasks}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};