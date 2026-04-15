import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Briefcase, Award, Bell } from 'lucide-react';
import { Button } from './ui/button';

export const Hero = ({ onNavigate }) => {
  const stats = [
    { icon: Users, value: '120+', label: 'Students Placed' },
    { icon: Briefcase, value: '50+', label: 'Active Internships' },
    { icon: Award, value: '95%', label: 'Placement Rate' },
  ];

  const noticeTicker = [
    "🎯 New Google SDE internship applications open - Apply by Dec 31st",
    "📚 Resume building workshop this Friday 4 PM - Register now",
    "🏆 Microsoft diversity scholarship applications now live",
    "💼 Tech Career Fair next week - 50+ companies participating",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 sm:py-20">
      {/* Background animated circles (unchanged) */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        <motion.div className="absolute top-10 left-5 w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 dark:bg-gray-700 rounded-full opacity-60" animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-40 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 dark:bg-gray-800 rounded-full opacity-40" animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute bottom-10 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gray-400 dark:bg-gray-600 rounded-full opacity-50" animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          {/* Heading with clamp */}
          <h1 
            className="font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 leading-tight break-words"
            style={{ fontSize: 'clamp(1.75rem, 8vw, 4rem)' }}
          >
            Launch Your
            <span className="block text-transparent bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-400 dark:to-gray-500 bg-clip-text break-words">
              Career Journey
            </span>
          </h1>

          {/* Paragraph with clamp */}
          <p 
            className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 break-words"
            style={{ fontSize: 'clamp(0.875rem, 4vw, 1.25rem)' }}
          >
            Connect with top companies, find meaningful internships, and build the career you've always dreamed of.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12">
            <Button
              size="lg"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 rounded-xl hover-lift group text-sm sm:text-base"
              onClick={() => onNavigate?.('opportunities')}
            >
              Explore Opportunities
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 sm:px-8 py-3 rounded-xl hover-lift text-sm sm:text-base"
              onClick={() => onNavigate?.('profile')}
            >
              Complete Your Profile
            </Button>
          </div>

          {/* Notice Board Ticker - AUTO-SCROLLING MARQUEE (no scrollbar) */}
          <div className="mb-10 sm:mb-12 overflow-hidden bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">Latest Updates</span>
            </div>
            <div className="relative overflow-hidden whitespace-nowrap">
              <motion.div
                className="inline-flex space-x-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {/* Duplicate the array for seamless loop */}
                {[...noticeTicker, ...noticeTicker].map((notice, index) => (
                  <span key={index} className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm inline-block">
                    {notice}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-4 sm:p-6 text-center hover-lift bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};