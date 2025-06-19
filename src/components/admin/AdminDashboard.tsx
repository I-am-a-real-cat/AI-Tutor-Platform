import React, { useState } from 'react';
import { 
  Users, BookOpen, MessageSquare, BarChart3, Settings, 
  Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2,
  AlertCircle, CheckCircle, Clock, TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  darkMode: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'inquiries' | 'analytics'>('overview');

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalContent: 156,
    pendingInquiries: 23,
    completionRate: 78.5,
    avgSessionTime: 45
  };

  const recentActivity = [
    { id: 1, type: 'user_registration', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, type: 'content_upload', user: 'Admin', content: 'Calculus Video Lesson', time: '15 minutes ago' },
    { id: 3, type: 'inquiry_submitted', user: 'Jane Smith', subject: 'Physics', time: '1 hour ago' },
    { id: 4, type: 'quiz_completed', user: 'Mike Johnson', subject: 'Mathematics', time: '2 hours ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : darkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{stats.totalUsers}</span>
                </div>
                <h3 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Total Users</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{stats.activeUsers} active today</p>
              </div>

              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats.totalContent}</span>
                </div>
                <h3 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Content Items</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Across all subjects</p>
              </div>

              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{stats.pendingInquiries}</span>
                </div>
                <h3 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Pending Inquiries</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Require response</p>
              </div>

              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{stats.completionRate}%</span>
                </div>
                <h3 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Completion Rate</h3>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Average across subjects</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`border rounded-xl p-6 transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className={`flex items-center justify-between p-4 border rounded-lg transition-colors duration-300 ${
                    darkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'user_registration' ? 'bg-green-100' :
                        activity.type === 'content_upload' ? 'bg-blue-100' :
                        activity.type === 'inquiry_submitted' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'user_registration' && <Users className="w-4 h-4 text-green-600" />}
                        {activity.type === 'content_upload' && <Upload className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'inquiry_submitted' && <MessageSquare className="w-4 h-4 text-yellow-600" />}
                        {activity.type === 'quiz_completed' && <CheckCircle className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div>
                        <p className={`font-medium transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {activity.user}
                          {activity.type === 'user_registration' && ' registered'}
                          {activity.type === 'content_upload' && ` uploaded "${activity.content}"`}
                          {activity.type === 'inquiry_submitted' && ` submitted an inquiry about ${activity.subject}`}
                          {activity.type === 'quiz_completed' && ` completed a ${activity.subject} quiz`}
                        </p>
                        <p className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>User Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                <button className={`p-2 border rounded-lg transition-colors ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Filter className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Users
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>User</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Level</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Progress</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Last Active</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y transition-colors duration-300 ${
                    darkMode ? 'divide-gray-600' : 'divide-gray-200'
                  }`}>
                    {/* Sample user rows */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" alt="" />
                          <div className="ml-4">
                            <div className={`text-sm font-medium transition-colors duration-300 ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>John Doe</div>
                            <div className={`text-sm transition-colors duration-300 ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>john@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          High School
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-full bg-gray-200 rounded-full h-2 mr-2 ${
                            darkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}>
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className={`text-sm transition-colors duration-300 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>75%</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        2 hours ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Content Management Header */}
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Content Management</h2>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Content
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample content items */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-green-600 hover:text-green-700">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Calculus Fundamentals</h3>
                <p className={`text-sm mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Introduction to limits and derivatives</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Video</span>
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>1,234 views</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Inquiries Header */}
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Student Inquiries</h2>
              <div className="flex items-center space-x-4">
                <select className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option>All Inquiries</option>
                  <option>Pending</option>
                  <option>Answered</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
              {/* Sample inquiry */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" alt="" />
                    <div>
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>Sarah Johnson</h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>Mathematics • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Pending
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      High Priority
                    </span>
                  </div>
                </div>
                <h4 className={`font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Need help with integration by parts</h4>
                <p className={`text-sm mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I'm having trouble understanding when to use integration by parts versus other integration techniques. 
                  Could you provide some examples and explain the decision-making process?
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className={`w-4 h-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Response due in 22 hours</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Respond
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Analytics & Reports</h2>

            {/* Analytics Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>User Engagement</h3>
                <div className={`h-64 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Chart placeholder</p>
                </div>
              </div>

              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Subject Performance</h3>
                <div className={`h-64 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Chart placeholder</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};