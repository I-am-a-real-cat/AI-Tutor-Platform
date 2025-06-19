import React, { useState } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, BarChart3, 
  TrendingUp, TrendingDown, Clock, BookOpen, Target
} from 'lucide-react';

interface MonthlyOverviewProps {
  darkMode: boolean;
}

interface DayData {
  date: number;
  studyTime: number;
  subjects: string[];
  isToday?: boolean;
  hasData?: boolean;
}

interface SubjectStats {
  name: string;
  totalHours: number;
  sessions: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({ darkMode }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar data for the current month
  const generateCalendarData = (): DayData[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    const calendarData: DayData[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarData.push({ date: 0, studyTime: 0, subjects: [] });
    }
    
    // Add actual days of the month with mock data
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === month && 
                     new Date().getFullYear() === year;
      
      // Mock study data
      const studyTime = Math.random() > 0.3 ? Math.floor(Math.random() * 300) + 30 : 0;
      const subjects = studyTime > 0 ? ['Math', 'Physics', 'Chemistry'].slice(0, Math.floor(Math.random() * 3) + 1) : [];
      
      calendarData.push({
        date: day,
        studyTime,
        subjects,
        isToday,
        hasData: studyTime > 0
      });
    }
    
    return calendarData;
  };

  const calendarData = generateCalendarData();
  
  const subjectStats: SubjectStats[] = [
    { name: 'Mathematics', totalHours: 45.5, sessions: 28, color: 'from-blue-500 to-blue-600', trend: 'up', trendValue: 12 },
    { name: 'Physics', totalHours: 38.2, sessions: 22, color: 'from-purple-500 to-purple-600', trend: 'up', trendValue: 8 },
    { name: 'Chemistry', totalHours: 42.1, sessions: 25, color: 'from-green-500 to-green-600', trend: 'down', trendValue: -5 },
    { name: 'Biology', totalHours: 35.8, sessions: 20, color: 'from-emerald-500 to-emerald-600', trend: 'stable', trendValue: 2 },
    { name: 'History', totalHours: 28.3, sessions: 15, color: 'from-amber-500 to-amber-600', trend: 'up', trendValue: 15 }
  ];

  const totalMonthlyHours = subjectStats.reduce((total, subject) => total + subject.totalHours, 0);
  const averageDailyHours = totalMonthlyHours / new Date().getDate();
  const mostStudiedSubject = subjectStats.reduce((max, subject) => 
    subject.totalHours > max.totalHours ? subject : max
  );
  const leastStudiedSubject = subjectStats.reduce((min, subject) => 
    subject.totalHours < min.totalHours ? subject : min
  );

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getIntensityColor = (studyTime: number) => {
    if (studyTime === 0) return darkMode ? 'bg-gray-800' : 'bg-gray-100';
    if (studyTime < 60) return 'bg-blue-200';
    if (studyTime < 120) return 'bg-blue-400';
    if (studyTime < 180) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-8">
      {/* Monthly Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{totalMonthlyHours.toFixed(1)}h</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Total Study Time</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>This month</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{averageDailyHours.toFixed(1)}h</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Daily Average</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Per day</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{mostStudiedSubject.name}</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Most Studied</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>{mostStudiedSubject.totalHours.toFixed(1)} hours</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">{leastStudiedSubject.name}</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Needs Focus</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>{leastStudiedSubject.totalHours.toFixed(1)} hours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar View */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Study Calendar</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`text-lg font-medium px-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className={`text-center text-sm font-medium py-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarData.map((day, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors duration-300 ${
                  day.date === 0 ? '' : 
                  day.isToday ? 'ring-2 ring-blue-500' :
                  day.hasData ? `${getIntensityColor(day.studyTime)} text-white` :
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                } ${day.date > 0 ? 'cursor-pointer' : ''}`}
                title={day.hasData ? `${formatTime(day.studyTime)} - ${day.subjects.join(', ')}` : ''}
              >
                {day.date > 0 && day.date}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs">
            <span className={`transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Less</span>
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className="w-3 h-3 rounded bg-blue-200"></div>
              <div className="w-3 h-3 rounded bg-blue-400"></div>
              <div className="w-3 h-3 rounded bg-blue-600"></div>
              <div className="w-3 h-3 rounded bg-blue-800"></div>
            </div>
            <span className={`transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>More</span>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Subject Breakdown</h2>

          <div className="space-y-4">
            {subjectStats.map((subject) => (
              <div key={subject.name} className={`border rounded-lg p-4 transition-colors duration-300 ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{subject.name}</h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{subject.sessions} sessions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{subject.totalHours.toFixed(1)}h</div>
                    <div className={`flex items-center text-sm ${
                      subject.trend === 'up' ? 'text-green-600' :
                      subject.trend === 'down' ? 'text-red-600' : 
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {subject.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                       subject.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
                      {subject.trendValue > 0 ? '+' : ''}{subject.trendValue}%
                    </div>
                  </div>
                </div>

                <div className={`w-full rounded-full h-2 transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                    style={{ width: `${(subject.totalHours / totalMonthlyHours) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Trends */}
      <div className={`border rounded-xl p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Progress Trends</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className={`text-2xl font-bold text-green-600 mb-2`}>+23%</div>
            <div className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Study time increase vs last month</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div className={`text-2xl font-bold text-blue-600 mb-2`}>87%</div>
            <div className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Daily goals completion rate</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <div className={`text-2xl font-bold text-purple-600 mb-2`}>22</div>
            <div className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Active study days this month</div>
          </div>
        </div>
      </div>
    </div>
  );
};