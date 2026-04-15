import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, Briefcase, Calendar, FileText, UserCheck,
  Plus, Trash2, Search, Bell, Eye, CheckCircle, Clock,
  ClipboardList, AlertCircle, ChevronDown, ChevronUp,
  Edit, Save, X, TrendingUp, Timer
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

const companyId = 'company-001';

const initialJobPosts = [
  { id: 1, title: 'Software Engineer Intern', description: 'Looking for talented software engineering interns for summer 2024', department: 'Engineering', location: 'Bangalore', type: 'internship', applications: 45, views: 234, posted: '2024-01-15', deadline: '2024-03-15', status: 'active', assignedStudentId: 'stu-001' },
  { id: 2, title: 'Data Scientist Intern', description: 'Seeking data science interns with ML/AI background', department: 'Data Science', location: 'Remote', type: 'internship', applications: 32, views: 189, posted: '2024-01-18', deadline: '2024-03-20', status: 'active', assignedStudentId: 'stu-002' },
  { id: 3, title: 'Product Manager Intern', description: 'Product intern to work on customer-facing features', department: 'Product', location: 'Mumbai', type: 'internship', applications: 28, views: 156, posted: '2024-01-20', deadline: '2024-03-25', status: 'active', assignedStudentId: 'stu-003' },
  { id: 4, title: 'Operations Intern', description: 'Support operations and process improvement initiatives', department: 'Operations', location: 'Delhi', type: 'internship', applications: 14, views: 89, posted: '2024-01-22', deadline: '2024-03-28', status: 'active', assignedStudentId: 'stu-004' },
];

const initialNotices = [
  { id: 1, title: 'Campus Placement Drive – March 2024', content: 'We are excited to announce our campus placement drive for March 2024. Multiple positions available.', type: 'placement', posted: '2024-01-10', targetAudience: 'Final Year' },
];

const statusColor = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  closed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  shortlisted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  interview: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  present: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  absent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  'half-day': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
};

const typeColor = {
  internship: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  placement: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  fulltime: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  contract: 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

export const CompanyDashboard = () => {
  const { assignments, attendance, addAttendance, deleteAttendance, getStudentHours, getAttendanceRate, getStudentAttendance } = useSharedData();

  const [jobPosts, setJobPosts] = useState(initialJobPosts);
  const [notices, setNotices] = useState(initialNotices);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  const [expandedStudent, setExpandedStudent] = useState(null);

  const [attendanceForm, setAttendanceForm] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    hoursWorked: '8',
    status: 'present',
    task: '',
  });

  const [newJob, setNewJob] = useState({ title: '', description: '', department: '', location: '', type: 'internship', deadline: '' });
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'placement', targetAudience: 'Final Year' });

  const myAssignments = assignments.filter(a => a.companyId === companyId && a.status === 'active');
  const myJobPosts = jobPosts;

  const companyStats = [
    { label: 'Active Job Posts', value: myJobPosts.filter(j => j.status === 'active').length, icon: Briefcase, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Assigned Interns', value: myAssignments.length, icon: UserCheck, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Total Applications', value: myJobPosts.reduce((s, j) => s + j.applications, 0), icon: FileText, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800' },
    { label: 'Attendance Logs', value: attendance.filter(a => myAssignments.some(m => m.studentId === a.studentId)).length, icon: ClipboardList, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  const handleLogAttendance = () => {
    if (!attendanceForm.studentId || !attendanceForm.date) {
      toast.error('Please select a student and date');
      return;
    }
    if (attendanceForm.status !== 'absent' && !attendanceForm.task.trim()) {
      toast.error('Please enter the task/work done');
      return;
    }
    const assignment = myAssignments.find(a => a.studentId === attendanceForm.studentId);
    if (!assignment) return;

    addAttendance({
      studentId: attendanceForm.studentId,
      studentName: assignment.studentName,
      date: attendanceForm.date,
      hoursWorked: attendanceForm.status === 'absent' ? 0 : attendanceForm.status === 'half-day' ? 4 : Number(attendanceForm.hoursWorked),
      status: attendanceForm.status,
      task: attendanceForm.status === 'absent' ? '-' : attendanceForm.task,
      loggedBy: 'TechCorp Solutions',
    });

    setAttendanceForm({ studentId: '', date: new Date().toISOString().split('T')[0], hoursWorked: '8', status: 'present', task: '' });
    toast.success('Attendance logged successfully');
  };

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.description || !newJob.deadline) { toast.error('Please fill required fields'); return; }
    const job = { id: Date.now(), ...newJob, applications: 0, views: 0, posted: new Date().toISOString().split('T')[0], status: 'active' };
    setJobPosts([job, ...jobPosts]);
    setIsJobDialogOpen(false);
    setNewJob({ title: '', description: '', department: '', location: '', type: 'internship', deadline: '' });
    toast.success('Job posted successfully');
  };

  const handleCreateNotice = () => {
    if (!newNotice.title || !newNotice.content) { toast.error('Please fill required fields'); return; }
    const notice = { id: Date.now(), ...newNotice, posted: new Date().toISOString().split('T')[0] };
    setNotices([notice, ...notices]);
    setIsNoticeDialogOpen(false);
    setNewNotice({ title: '', content: '', type: 'placement', targetAudience: 'Final Year' });
    toast.success('Notice posted successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      {/* Header */}
      <motion.div className="mb-6 sm:mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-800 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Company Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">TechCorp Solutions — Recruiter Portal</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {companyStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-3 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs - horizontally scrollable on mobile */}
      <Tabs defaultValue="interns" className="space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 h-auto inline-flex min-w-max gap-1">
            <TabsTrigger value="interns" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <UserCheck className="w-4 h-4 mr-2" /> Interns ({myAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <ClipboardList className="w-4 h-4 mr-2" /> Log Attendance
            </TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <Briefcase className="w-4 h-4 mr-2" /> Job Posts
            </TabsTrigger>
            <TabsTrigger value="applications" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <FileText className="w-4 h-4 mr-2" /> Applications
            </TabsTrigger>
            <TabsTrigger value="notices" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-700 whitespace-nowrap">
              <Bell className="w-4 h-4 mr-2" /> Notices
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── INTERNS TAB (responsive) ── */}
        <TabsContent value="interns" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 text-base sm:text-lg">Assigned Interns</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">One student is assigned per job post. Track their progress and attendance here.</p>
            </div>
          </div>

          {myAssignments.length === 0 ? (
            <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="py-12 sm:py-16 text-center text-gray-500 dark:text-gray-400">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 opacity-30" />
                <p>No interns assigned yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {myAssignments.map((a, i) => {
                const totalHours = getStudentHours(a.studentId);
                const rate = getAttendanceRate(a.studentId);
                const progressPct = Math.min(100, Math.round((totalHours / a.totalRequiredHours) * 100));
                const isExpanded = expandedStudent === a.studentId;
                const logs = getStudentAttendance(a.studentId).slice(0, 7);

                return (
                  <motion.div key={a.studentId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <Card className="border-0 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 dark:bg-gray-700 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                              {a.studentName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{a.studentName}</h3>
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{a.rollNumber}</span>
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">Active</Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{a.jobTitle}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{a.department} · {a.year} · {a.stipend}</p>
                            </div>
                          </div>

                          <div className="flex gap-4 text-center flex-shrink-0 justify-around sm:justify-end">
                            <div>
                              <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{totalHours}</div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">hrs</div>
                            </div>
                            <div>
                              <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{rate}%</div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">att</div>
                            </div>
                            <div>
                              <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{progressPct}%</div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">prog</div>
                            </div>
                          </div>

                          <button
                            onClick={() => setExpandedStudent(isExpanded ? null : a.studentId)}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors self-end sm:self-center"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Hours: {totalHours} / {a.totalRequiredHours}</span>
                            <span>{a.startDate} → {a.endDate}</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPct}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                            />
                          </div>
                        </div>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                          >
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Attendance</p>
                            {logs.length === 0 ? (
                              <p className="text-sm text-gray-400 dark:text-gray-500">No logs yet</p>
                            ) : (
                              <div className="space-y-2">
                                {logs.map(log => (
                                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg gap-2">
                                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm w-full sm:w-28 flex-shrink-0">{log.date}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-20 text-center flex-shrink-0 ${statusColor[log.status]}`}>{log.status}</span>
                                    <span className="text-gray-600 dark:text-gray-300 flex-1 text-xs sm:text-sm break-all">{log.task}</span>
                                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 flex items-center gap-1 text-xs">
                                      <Timer className="w-3 h-3" />{log.hoursWorked}h
                                    </span>
                                    <button onClick={() => deleteAttendance(log.id)} className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── ATTENDANCE TAB (responsive) ── */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="border-0 shadow-md lg:col-span-2 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3 px-4 sm:px-6">
                <CardTitle className="text-base flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Log Attendance
                </CardTitle>
                <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Record daily attendance and work hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6">
                <div>
                  <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Intern *</Label>
                  <Select value={attendanceForm.studentId} onValueChange={v => setAttendanceForm(f => ({ ...f, studentId: v }))}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select intern…" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {myAssignments.map(a => (
                        <SelectItem key={a.studentId} value={a.studentId}>
                          {a.studentName} — {a.jobTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Date *</Label>
                  <Input type="date" value={attendanceForm.date} onChange={e => setAttendanceForm(f => ({ ...f, date: e.target.value }))} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Status *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['present', 'half-day', 'absent']).map(s => (
                      <button
                        key={s}
                        onClick={() => setAttendanceForm(f => ({ ...f, status: s, hoursWorked: s === 'absent' ? '0' : s === 'half-day' ? '4' : '8' }))}
                        className={`py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border-2 transition-all ${
                          attendanceForm.status === s
                            ? s === 'present' ? 'border-green-500 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300'
                              : s === 'half-day' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:border-yellow-400 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'border-red-500 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-900/30 dark:text-red-300'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        {s === 'half-day' ? 'Half Day' : s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                {attendanceForm.status !== 'absent' && (
                  <div>
                    <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Hours Worked</Label>
                    <Input
                      type="number"
                      min="1" max="12"
                      value={attendanceForm.hoursWorked}
                      onChange={e => setAttendanceForm(f => ({ ...f, hoursWorked: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                )}
                {attendanceForm.status !== 'absent' && (
                  <div>
                    <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Task / Work Done *</Label>
                    <Textarea
                      placeholder="Describe what the intern worked on…"
                      value={attendanceForm.task}
                      onChange={e => setAttendanceForm(f => ({ ...f, task: e.target.value }))}
                      rows={3}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>
                )}
                <Button onClick={handleLogAttendance} className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" /> Log Attendance
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md lg:col-span-3 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3 px-4 sm:px-6">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Recent Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {attendance
                    .filter(r => myAssignments.some(a => a.studentId === r.studentId))
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 20)
                    .map(log => (
                      <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: log.status === 'present' ? '#22c55e' : log.status === 'absent' ? '#ef4444' : '#eab308' }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm">{log.studentName}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[log.status]}`}>{log.status}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{log.task}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{log.hoursWorked}h</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">{log.date}</div>
                          </div>
                          <button onClick={() => deleteAttendance(log.id)} className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> Intern Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {myAssignments.map(a => {
                  const logs = attendance.filter(r => r.studentId === a.studentId);
                  const presentDays = logs.filter(r => r.status === 'present').length;
                  const halfDays = logs.filter(r => r.status === 'half-day').length;
                  const absentDays = logs.filter(r => r.status === 'absent').length;
                  const totalHours = getStudentHours(a.studentId);
                  const rate = getAttendanceRate(a.studentId);

                  return (
                    <div key={a.studentId} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          {a.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">{a.studentName.split(' ')[0]}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{a.rollNumber}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center text-xs mb-3">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg py-1.5">
                          <div className="font-bold text-green-700 dark:text-green-400">{presentDays}</div>
                          <div className="text-green-600 dark:text-green-500">Present</div>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg py-1.5">
                          <div className="font-bold text-yellow-700 dark:text-yellow-400">{halfDays}</div>
                          <div className="text-yellow-600 dark:text-yellow-500">Half Day</div>
                        </div>
                        <div className="bg-red-100 dark:bg-red-900/30 rounded-lg py-1.5">
                          <div className="font-bold text-red-700 dark:text-red-400">{absentDays}</div>
                          <div className="text-red-600 dark:text-red-500">Absent</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>{totalHours}h / {a.totalRequiredHours}h</span>
                        <span>{rate}% rate</span>
                      </div>
                      <Progress value={rate} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── JOB POSTS TAB (responsive) ── */}
        <TabsContent value="jobs" className="space-y-4">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="dark:text-gray-100 text-lg sm:text-xl">Job Posts</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Each job post can have one assigned intern. One student per position.</CardDescription>
                </div>
                <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 w-full sm:w-auto"><Plus className="w-4 h-4 mr-2" />Post New Job</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-2xl dark:bg-gray-800 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="dark:text-gray-100">Post New Job</DialogTitle>
                      <DialogDescription className="dark:text-gray-400">Fill in the details to create a new job posting</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label className="dark:text-gray-300">Job Title *</Label>
                        <Input value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} placeholder="e.g., Software Engineer Intern" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label className="dark:text-gray-300">Job Description *</Label>
                        <Textarea value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} rows={3} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="dark:text-gray-300">Department</Label>
                          <Input value={newJob.department} onChange={e => setNewJob({ ...newJob, department: e.target.value })} placeholder="e.g., Engineering" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div>
                          <Label className="dark:text-gray-300">Location</Label>
                          <Input value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} placeholder="e.g., Bangalore" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="dark:text-gray-300">Type *</Label>
                          <Select value={newJob.type} onValueChange={v => setNewJob({ ...newJob, type: v })}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="internship">Internship</SelectItem>
                              <SelectItem value="placement">Placement</SelectItem>
                              <SelectItem value="fulltime">Full Time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="dark:text-gray-300">Deadline *</Label>
                          <Input type="date" value={newJob.deadline} onChange={e => setNewJob({ ...newJob, deadline: e.target.value })} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">Only <strong>one student</strong> can be assigned per job post once hired.</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsJobDialogOpen(false)} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</Button>
                      <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={handleCreateJob}>Post Job</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {myJobPosts.map(job => {
                  const assignedStudent = myAssignments.find(a => a.studentId === job.assignedStudentId);
                  return (
                    <div key={job.id} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{job.title}</h3>
                            <Badge className={`${typeColor[job.type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'} text-xs`}>{job.type}</Badge>
                            <Badge className={`${statusColor[job.status] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'} text-xs`}>{job.status}</Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">{job.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {job.department && <span>📁 {job.department}</span>}
                            {job.location && <span>📍 {job.location}</span>}
                            <span>⏳ {job.deadline}</span>
                            <span>👁 {job.views} views</span>
                            <span>📄 {job.applications} apps</span>
                          </div>
                        </div>
                        <button onClick={() => setJobPosts(jobPosts.filter(j => j.id !== job.id))} className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors self-start">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {assignedStudent ? (
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                              Assigned: <span className="font-semibold">{assignedStudent.studentName}</span>
                              <span className="text-gray-400 dark:text-gray-500 ml-1">({assignedStudent.rollNumber})</span>
                            </span>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">Active Intern</Badge>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-yellow-600 dark:text-yellow-400">
                            <Clock className="w-4 h-4" /> No intern assigned yet
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── APPLICATIONS TAB (responsive) ── */}
        <TabsContent value="applications" className="space-y-4">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="dark:text-gray-100 text-lg sm:text-xl">Application Review</CardTitle>
              <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Review candidates. Each position accepts only one intern.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {[
                  { id: 1, student: 'Alice Johnson', rollNo: '21CS044', position: 'Software Engineer Intern', score: 94, status: 'shortlisted', applied: '2024-01-20', cgpa: 9.1 },
                  { id: 2, student: 'Bob Chen', rollNo: '21CS078', position: 'Data Scientist Intern', score: 89, status: 'interview', applied: '2024-01-18', cgpa: 8.8 },
                  { id: 3, student: 'Carol Davis', rollNo: '21CS033', position: 'Software Engineer Intern', score: 91, status: 'pending', applied: '2024-01-17', cgpa: 8.6 },
                  { id: 4, student: 'David Kim', rollNo: '21EC019', position: 'Product Manager Intern', score: 87, status: 'interview', applied: '2024-01-22', cgpa: 8.4 },
                ].map(app => (
                  <div key={app.id} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{app.student}</h3>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{app.rollNo}</span>
                          <Badge className={`${statusColor[app.status] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'} text-xs`}>{app.status}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{app.position}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            Match: <Progress value={app.score} className="w-16 sm:w-20 h-1.5 inline-block" /><span className="font-medium text-gray-700 dark:text-gray-300">{app.score}%</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">CGPA: <strong>{app.cgpa}</strong></span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">Applied: {app.applied}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 text-xs sm:text-sm">View Resume</Button>
                        <Button size="sm" className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs sm:text-sm">Shortlist</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── NOTICES TAB (responsive) ── */}
        <TabsContent value="notices" className="space-y-4">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="dark:text-gray-100 text-lg sm:text-xl">Company Notices</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Post announcements for students and interns</CardDescription>
                </div>
                <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 w-full sm:w-auto"><Plus className="w-4 h-4 mr-2" />Post Notice</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] sm:max-w-xl dark:bg-gray-800 dark:border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="dark:text-gray-100">Post New Notice</DialogTitle>
                      <DialogDescription className="dark:text-gray-400">Share announcements with students</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label className="dark:text-gray-300">Title *</Label>
                        <Input value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} placeholder="Notice title" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label className="dark:text-gray-300">Content *</Label>
                        <Textarea value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} rows={4} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="dark:text-gray-300">Type</Label>
                          <Select value={newNotice.type} onValueChange={v => setNewNotice({ ...newNotice, type: v })}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="placement">Placement Drive</SelectItem>
                              <SelectItem value="internship">Internship</SelectItem>
                              <SelectItem value="workshop">Workshop/Webinar</SelectItem>
                              <SelectItem value="announcement">Announcement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="dark:text-gray-300">Target Audience</Label>
                          <Select value={newNotice.targetAudience} onValueChange={v => setNewNotice({ ...newNotice, targetAudience: v })}>
                            <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                              <SelectItem value="All Students">All Students</SelectItem>
                              <SelectItem value="Final Year">Final Year</SelectItem>
                              <SelectItem value="Pre-Final Year">Pre-Final Year</SelectItem>
                              <SelectItem value="Interns Only">Interns Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNoticeDialogOpen(false)} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Cancel</Button>
                      <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={handleCreateNotice}>Post Notice</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {notices.map(notice => (
                  <div key={notice.id} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{notice.title}</h3>
                          <Badge className={`${typeColor[notice.type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'} text-xs`}>{notice.type}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">{notice.content}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500">
                          <span>👥 {notice.targetAudience}</span>
                          <span>📅 {notice.posted}</span>
                        </div>
                      </div>
                      <button onClick={() => setNotices(notices.filter(n => n.id !== notice.id))} className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors self-start">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {notices.length === 0 && (
                  <div className="text-center py-8 sm:py-12 text-gray-400 dark:text-gray-500">
                    <Bell className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No notices posted yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};