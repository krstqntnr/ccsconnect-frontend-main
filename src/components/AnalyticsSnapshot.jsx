import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

export const AnalyticsSnapshot = () => {
  const departmentStats = [
    { department: 'Computer Science', placed: 95, total: 100 },
    { department: 'Electronics', placed: 87, total: 95 },
    { department: 'Mechanical', placed: 78, total: 85 },
    { department: 'Civil', placed: 82, total: 90 },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time insights into our campus placement performance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="dark:text-gray-100">Department Wise Placement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {departmentStats.map((dept, index) => {
                const percentage = Math.round((dept.placed / dept.total) * 100);
                return (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{dept.department}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{dept.placed}/{dept.total}</span>
                    </div>
                    <Progress value={percentage} className="h-3 dark:bg-gray-700" />
                    <div className="text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                      {percentage}%
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};