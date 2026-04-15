import React from 'react';
import { Hero } from './Hero';
import { QuickAccess } from './QuickAccess';
import { OpportunityCarousel } from './OpportunityCarousel';
import { AnalyticsSnapshot } from './AnalyticsSnapshot';
import { NoticeBoard } from './NoticeBoard';

export const Home = () => {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <QuickAccess />
          </div>
          <div className="lg:col-span-1">
            <NoticeBoard isHomePage={true} />
          </div>
        </div>
      </div>
      <OpportunityCarousel />
      <AnalyticsSnapshot />
    </>
  );
};