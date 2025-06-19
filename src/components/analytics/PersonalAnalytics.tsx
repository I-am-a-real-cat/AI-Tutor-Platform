import React, { useState } from 'react';
import { 
  TrendingUp, Award, Target, Calendar, Clock, BookOpen,
  Zap, Star, BarChart3, PieChart, Settings, Filter
} from 'lucide-react';

interface PersonalAnalyticsProps {
  darkMode: boolean;
}

interface StudyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: Date;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedDate: Date;
  category: string;
  icon: string;
}

interface PerformanceMetric {
  subject: string;
  accuracy: number;
  improvement: number;
  sessionsCompleted: number;
  averageScore: number;
  color: string;
}

export const PersonalAnalytics: React.FC<PersonalAnalyticsProps> = ({ darkMode }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [showGoalModal, setShowGoalModal] = useState(false);

  const studyGoals: StudyGoal[] = [
    {
      id: '1',
      title: 'Complete 100 Math Problems',
      target: 100,
      current: 78,
      deadline: new Date('2024-12-31'),
      category: 'Mathematics',
      priority: 'high',
      completed: false
    },
    {
      id: '2',
      title: 'Study 50 Hours This Month',
      target: 50,
      current: 42,
      deadline: new Date('2024-12-31'),
      category: 'General',
      priority: 'medium',
      completed: false
    },
    {
      id: '3',
      title: 'Master Organic Chemistry',
      target: 20,
      current: 20,
      deadline: new Date('2024-12-15'),
      category: 'Chemistry',
      priority: 'high',
      completed: true
    }
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      title: '30-Day Study Streak',
      description: 'Studied consistently for 30 days in a row',
      achievedDate: new Date('2024-12-10'),
      category: 'Consistency',
      icon: 'Zap'
    },
    {
      id: '2',
      title: 'Math Master',
      description: 'Achieved 90%+ accuracy in 10 consecutive math quizzes',
      achievedDate: new Date('2024-12-05'),
      category: 'Performance',
      icon: 'Award'
    },
    {
      id: '3',
      title: 'Speed Learner',
      description: 'Completed 5 subjects in record time',
      achievedDate: new Date('2024-11-28'),
      category: 'Efficiency',
      icon: 'Star'
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      subject: 'Mathematics',
      accuracy: 87,
      improvement: 12,
      sessionsCompleted: 45,
      averageScore: 85,
      color: 'from-blue-500 to-blue-600'
    },
    {
      subject: 'Physics',
      accuracy: 82,
      improvement: 8,
      sessionsCompleted: 32,
      averageScore: 78,
      color: 'from-purple-500 to-purple-600'
    },
    {
      subject: 'Chemistry',
      accuracy: 91,
      improvement: 15,
      sessionsCompleted: 38,
      averageScore: 88,
      color: 'from-green-500 to-green-600'
    },
    {
      subject: 'Biology',
      accuracy: 85,
      improvement: 5,
      sessionsCompleted: 28,
      averageScore: 82,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const weeklyData = [
    { week: 'Week 1', hours: 12, sessions: 8 },
    { week: 'Week 2', hours: 15, sessions: 10 },
    { week: 'Week 3', hours: 18, sessions: 12 },
    { week: 'Week 4', hours: 22, sessions: 15 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons = { Zap, Award, Star };
    return icons[iconName as keyof typeof icons] || Star;
  };

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Personal Analytics</h1>
          <p className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Track your learning progress and achievements</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">28</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Current Streak</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Days in a row</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">85%</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Goal Completion</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>This month</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">+15%</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Performance</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Improvement</p>
        </div>

        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">12</span>
          </div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Achievements</h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Unlocked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Goals */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Study Goals</h2>
            <button 
              onClick={() => setShowGoalModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Goal
            </button>
          </div>

          <div className="space-y-4">
            {studyGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                } ${goal.completed ? 'bg-green-50 border-green-200' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        } ${goal.completed ? 'line-through text-green-700' : ''}`}>
                          {goal.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      </div>
                      <p className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {goal.current} / {goal.target} • {goal.category}
                      </p>
                      {!goal.completed && (
                        <p className={`text-xs mt-1 transition-colors duration-300 ${
                          daysLeft < 7 ? 'text-red-600' : darkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                        </p>
                      )}
                    </div>
                    <span className={`text-lg font-bold ${
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

        {/* Recent Milestones */}
        <div className={`border rounded-xl p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Recent Achievements</h2>

          <div className="space-y-4">
            {milestones.map((milestone) => {
              const IconComponent = getIconComponent(milestone.icon);
              return (
                <div key={milestone.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{milestone.title}</h3>
                      <p className={`text-sm mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{milestone.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {milestone.category}
                        </span>
                        <span className={`text-xs transition-colors duration-300 ${
                          darkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {milestone.achievedDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={`border rounded-xl p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Subject Performance</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric) => (
            <div key={metric.subject} className={`border rounded-lg p-4 transition-colors duration-300 ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{metric.subject}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Accuracy</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{metric.accuracy}%</span>
                </div>

                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Improvement</span>
                  <span className={`font-medium ${
                    metric.improvement > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Sessions</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{metric.sessionsCompleted}</span>
                </div>

                <div className="flex justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Avg Score</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{metric.averageScore}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className={`border rounded-xl p-6 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Weekly Progress</h2>

        <div className="grid grid-cols-4 gap-4">
          {weeklyData.map((week, index) => (
            <div key={week.week} className="text-center">
              <div className={`border rounded-lg p-4 mb-2 transition-colors duration-300 ${
                darkMode ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <div className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{week.hours}h</div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{week.sessions} sessions</div>
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>{week.week}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};