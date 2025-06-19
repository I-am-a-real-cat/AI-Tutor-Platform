import React, { useState } from 'react';
import { 
  Clock, BookOpen, Target, CheckCircle, TrendingUp, 
  Play, Pause, Plus, Calendar, Award, Zap
} from 'lucide-react';

interface DailyTrackerProps {
  darkMode: boolean;
}

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  startTime: Date;
  endTime?: Date;
  concepts: string[];
  isActive: boolean;
}

interface DailyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({ darkMode }) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);

  const todaysSessions: StudySession[] = [
    {
      id: '1',
      subject: 'Mathematics',
      duration: 90,
      startTime: new Date('2024-12-16T09:00:00'),
      endTime: new Date('2024-12-16T10:30:00'),
      concepts: ['Derivatives', 'Chain Rule', 'Product Rule'],
      isActive: false
    },
    {
      id: '2',
      subject: 'Physics',
      duration: 45,
      startTime: new Date('2024-12-16T11:00:00'),
      concepts: ['Quantum Mechanics', 'Wave Functions'],
      isActive: true
    },
    {
      id: '3',
      subject: 'Chemistry',
      duration: 60,
      startTime: new Date('2024-12-16T14:00:00'),
      endTime: new Date('2024-12-16T15:00:00'),
      concepts: ['Organic Reactions', 'Synthesis Pathways'],
      isActive: false
    }
  ];

  const dailyGoals: DailyGoal[] = [
    { id: '1', title: 'Study Hours', target: 4, current: 3.25, unit: 'hours', completed: false },
    { id: '2', title: 'Math Problems', target: 20, current: 20, unit: 'problems', completed: true },
    { id: '3', title: 'Reading Pages', target: 50, current: 35, unit: 'pages', completed: false },
    { id: '4', title: 'Practice Tests', target: 2, current: 1, unit: 'tests', completed: false }
  ];

  const totalStudyTime = todaysSessions.reduce((total, session) => total + session.duration, 0);
  const completedGoals = dailyGoals.filter(goal => goal.completed).length;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Mathematics': 'from-blue-500 to-blue-600',
      'Physics': 'from-purple-500 to-purple-600',
      'Chemistry': 'from-green-500 to-green-600',
      'Biology': 'from-emerald-500 to-emerald-600',
      'History': 'from-amber-500 to-amber-600'
    };
    return colors[subject as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-8">
      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{formatTime(totalStudyTime)}</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Total Study Time</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Today's progress</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{todaysSessions.length}</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Study Sessions</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Subjects covered</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{completedGoals}/{dailyGoals.length}</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Goals Completed</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Daily targets</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">12</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Study Streak</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Days in a row</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Sessions */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Today's Study Sessions</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </button>
          </div>

          <div className="space-y-4">
            {todaysSessions.map((session) => (
              <div key={session.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              } ${session.isActive ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getSubjectColor(session.subject)} flex items-center justify-center`}>
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{session.subject}</h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {session.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {session.endTime && ` - ${session.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{formatTime(session.duration)}</span>
                    {session.isActive && (
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Concepts Learned:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.concepts.map((concept, index) => (
                      <span key={index} className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Goals */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Daily Goals</h2>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </button>
          </div>

          <div className="space-y-4">
            {dailyGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div key={goal.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                } ${goal.completed ? 'bg-green-50 border-green-200' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {goal.completed ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className={`w-8 h-8 rounded-full border-2 border-gray-300 transition-colors duration-300 ${
                          darkMode ? 'border-gray-600' : 'border-gray-300'
                        }`}></div>
                      )}
                      <div>
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        } ${goal.completed ? 'line-through text-green-700' : ''}`}>{goal.title}</h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      goal.completed ? 'text-green-600' : darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className={`w-full rounded-full h-2 transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Concepts Learned Today */}
      <div className={`border rounded-xl p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Key Concepts Learned Today</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todaysSessions.map((session) => (
            <div key={session.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getSubjectColor(session.subject)} flex items-center justify-center`}>
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{session.subject}</h3>
              </div>
              <ul className="space-y-2">
                {session.concepts.map((concept, index) => (
                  <li key={index} className={`text-sm flex items-start transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {concept}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};