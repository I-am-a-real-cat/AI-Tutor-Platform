import React, { useState } from 'react';
import { 
  Clock, BookOpen, Flame, Trophy, BarChart3, TrendingUp
} from 'lucide-react';

interface StudyDashboardProps {
  onBack: () => void;
  darkMode: boolean;
}

export const StudyDashboard: React.FC<StudyDashboardProps> = ({ onBack, darkMode }) => {
  // Mock data for the analytics
  const todayStudyTime = { hours: 2, minutes: 25 };
  const totalStudyTime = 47; // hours
  const dayStreak = 12;
  const allSubjects = 6;
  const finishedSubjects = 2;

  // Mock data for the weekly chart
  const weeklyData = [
    { day: 'Mon', date: '12/9', hours: 1.5 },
    { day: 'Tue', date: '12/10', hours: 1.2 },
    { day: 'Wed', date: '12/11', hours: 2.3 },
    { day: 'Thu', date: '12/12', hours: 1.1 },
    { day: 'Fri', date: '12/13', hours: 2.1 },
    { day: 'Sat', date: '12/14', hours: 2.8 },
    { day: 'Sun', date: '12/15', hours: 2.0 }
  ];

  const totalThisWeek = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const dailyAverage = totalThisWeek / 7;
  const bestDay = Math.max(...weeklyData.map(d => d.hours));
  const weekProgress = 21; // percentage

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Study Analytics</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Today's Study Time */}
          <div className={`rounded-2xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className={`text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {todayStudyTime.hours}h {todayStudyTime.minutes}m
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Today's Study Time
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Current session progress
                </div>
              </div>
            </div>
          </div>

          {/* Total Study Time */}
          <div className={`rounded-2xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className={`text-2xl font-bold text-green-600`}>
                  {totalStudyTime}h
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Study Time
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  All time accumulated
                </div>
              </div>
            </div>
          </div>

          {/* Day Streak */}
          <div className={`rounded-2xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className={`text-2xl font-bold text-orange-600`}>
                  {dayStreak}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Day Streak
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Consecutive study days
                </div>
              </div>
            </div>
          </div>

          {/* All Subjects */}
          <div className={`rounded-2xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className={`text-2xl font-bold text-purple-600`}>
                  {allSubjects}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  All Subjects
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Total enrolled
                </div>
              </div>
            </div>
          </div>

          {/* Finished Subjects */}
          <div className={`rounded-2xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className={`text-2xl font-bold text-yellow-600`}>
                  {finishedSubjects}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Finished Subjects
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  100% completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Study Time Chart */}
        <div className={`rounded-2xl p-8 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Daily Study Time</h2>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Last 7 days study time tracking</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Study Time</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-80 mb-6">
            <div className="flex items-end justify-between h-full space-x-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '240px' }}>
                    <div 
                      className="w-12 bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                      style={{ 
                        height: `${(day.hours / maxHours) * 200}px`,
                        minHeight: '20px'
                      }}
                    ></div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {day.day}
                    </div>
                    <div className={`text-xs transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {day.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Summary */}
          <div className="grid grid-cols-4 gap-6 pt-6 border-t border-opacity-20 border-gray-300">
            <div className="text-center">
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {Math.floor(totalThisWeek)}h {Math.round((totalThisWeek % 1) * 60)}m
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total This Week
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {Math.floor(dailyAverage)}h {Math.round((dailyAverage % 1) * 60)}m
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Daily Average
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {Math.floor(bestDay)}h {Math.round((bestDay % 1) * 60)}m
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Best Day
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-green-600`}>
                +{weekProgress}%
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Week Progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};