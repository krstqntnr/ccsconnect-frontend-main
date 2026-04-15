import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Pin, ExternalLink, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const NoticeBoard = ({ isHomePage = false }) => {
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const sampleNotices = [
    {
      id: 1,
      title: 'Google Summer Internship 2024 — Applications Open',
      content: 'Google is now accepting applications for their Summer 2024 internship program. Eligible: Final year CSE/IT/ECE students with CGPA ≥ 8.0.',
      type: 'internship',
      pinned: true,
      start_date: '2024-01-01',
      end_date: '2024-03-15',
      created_by: 'Admin',
      created_at: '2024-01-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'Microsoft Campus Placement Drive',
      content: 'Microsoft campus placement drive is scheduled for January 2024. Roles: SWE, PM, Data Analyst.',
      type: 'placement',
      pinned: true,
      start_date: '2024-01-05',
      end_date: '2024-02-20',
      created_by: 'Admin',
      created_at: '2024-01-05T09:00:00Z'
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      content: 'Annual career fair with 50+ companies attending. All students eligible to participate.',
      type: 'workshop',
      pinned: false,
      start_date: '2024-02-01',
      end_date: '2024-02-28',
      created_by: 'Admin',
      created_at: '2024-01-10T11:00:00Z'
    },
    {
      id: 4,
      title: 'AWS Apprenticeship Program',
      content: 'AWS is offering a 12‑month apprenticeship for cloud enthusiasts.',
      type: 'apprenticeship',
      pinned: false,
      start_date: '2024-02-10',
      end_date: '2024-04-30',
      created_by: 'Admin',
      created_at: '2024-02-01T14:00:00Z'
    },
    {
      id: 5,
      title: 'Resume Building Workshop',
      content: 'Learn how to craft an industry‑ready resume with expert tips.',
      type: 'workshop',
      pinned: false,
      start_date: '2024-02-15',
      end_date: '2024-02-20',
      created_by: 'Admin',
      created_at: '2024-02-05T12:00:00Z'
    },
    {
      id: 6,
      title: 'Technical Assessment – Infosys',
      content: 'Online test for Infosys recruitment. All eligible students must appear.',
      type: 'assessment',
      pinned: false,
      start_date: '2024-02-20',
      end_date: '2024-02-25',
      created_by: 'Admin',
      created_at: '2024-02-10T09:00:00Z'
    }
  ];

  useEffect(() => {
    setTimeout(() => { setNotices(sampleNotices); setIsLoading(false); }, 500);
  }, []);

  const filteredNotices = notices.filter(notice => activeTab === 'all' || notice.type === activeTab);
  const displayNotices = isHomePage ? filteredNotices.slice(0, 4) : filteredNotices;

  const getTypeColor = (type) => {
    const colors = {
      internship: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      placement: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      project: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      apprenticeship: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      workshop: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      assessment: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const isExpiringSoon = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse"><div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div></div>
        ))}
      </div>
    );
  }

  return (
    <div className={isHomePage ? 'px-4 sm:px-0' : 'max-w-4xl mx-auto px-4 sm:px-6'}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="flex items-center space-x-2">
                <Pin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="dark:text-gray-100 text-lg sm:text-xl">Notice Board</span>
              </CardTitle>
              {isHomePage && (
                <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto">
                  View All <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {!isHomePage && (
              <div className="mb-6 overflow-x-auto pb-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="inline-flex w-auto min-w-max bg-gray-100 dark:bg-gray-700 rounded-xl p-1 h-auto gap-1">
                    <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="internship" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      Internships
                    </TabsTrigger>
                    <TabsTrigger value="placement" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      Placements
                    </TabsTrigger>
                    <TabsTrigger value="project" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      Projects
                    </TabsTrigger>
                    <TabsTrigger value="apprenticeship" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      Apprenticeship
                    </TabsTrigger>
                    <TabsTrigger value="workshop" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      Workshops
                    </TabsTrigger>
                    <TabsTrigger value="assessment" className="rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-800 whitespace-nowrap px-3 py-1.5 text-sm">
                      Assessments
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            <div className="space-y-4">
              {displayNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-3 sm:p-4 rounded-lg border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer ${
                    notice.pinned
                      ? 'border-l-gray-600 bg-gray-100 dark:border-l-gray-400 dark:bg-gray-700/50'
                      : 'border-l-gray-300 bg-white dark:border-l-gray-600 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div className="flex items-start space-x-2">
                      {notice.pinned && <Pin className="w-4 h-4 text-gray-600 dark:text-gray-400 fill-current mt-0.5 flex-shrink-0" />}
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base line-clamp-2">
                        {notice.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-0 sm:ml-4">
                      <Badge className={`${getTypeColor(notice.type)} text-xs px-2 py-0.5`}>{notice.type}</Badge>
                      {isExpiringSoon(notice.end_date) && (
                        <Badge variant="destructive" className="animate-pulse text-xs px-2 py-0.5">Expires Soon</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                    {notice.content}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Start: {formatDate(notice.start_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>End: {formatDate(notice.end_date)}</span>
                      </div>
                    </div>
                    <span>Posted {formatDate(notice.created_at)}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {displayNotices.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Pin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notices available for this category</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};