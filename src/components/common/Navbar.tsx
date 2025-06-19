import React, { useState } from 'react';
import { Menu, X, User, BookOpen, BarChart3, LogOut, Sun, Moon, Brain, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (view: 'dashboard' | 'profile' | 'subjects' | 'analytics' | 'ai-tutor') => void;
  currentView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  onToggleDarkMode, 
  onNavigate,
  currentView 
}) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleNavigation = (view: 'dashboard' | 'profile' | 'subjects' | 'analytics' | 'ai-tutor') => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate('dashboard');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    onNavigate('profile');
    setIsMenuOpen(false);
  };

  return (
    <header className={`border-b sticky top-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-4">
            {/* Burger Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 border rounded-xl shadow-lg transition-colors duration-300 z-50 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="p-2">
                    <button
                      onClick={() => handleNavigation('profile')}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={() => handleNavigation('subjects')}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 mr-3" />
                      My Subjects
                    </button>
                    <button
                      onClick={() => handleNavigation('analytics')}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 mr-3" />
                      Study Analytics
                    </button>
                    <button
                      onClick={onToggleDarkMode}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {darkMode ? <Sun className="w-4 h-4 mr-3" /> : <Moon className="w-4 h-4 mr-3" />}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <hr className={`my-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`} />
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors text-blue-600 hover:bg-blue-50 ${
                        darkMode ? 'hover:bg-blue-900' : ''
                      }`}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logo - Now Clickable */}
            <button 
              onClick={handleLogoClick}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-opacity-10 hover:bg-blue-600 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>LearnPath</span>
            </button>
          </div>

          {/* Center - AI Tutor Button */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => handleNavigation('ai-tutor')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                currentView === 'ai-tutor'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Tutor</span>
            </button>
          </div>

          {/* Right side - User info */}
          <div className="flex items-center space-x-6">
            {user && (
              <>
                <div className={`hidden md:flex items-center space-x-2 text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{user.currentStreak || 12} day streak</span>
                </div>
                <div className={`hidden md:flex items-center space-x-2 text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span>{Math.floor((user.totalStudyTime || 2840) / 60)}h study time</span>
                </div>
                <button
                  onClick={handleProfileClick}
                  className={`p-1 rounded-full transition-colors hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  title="Go to Profile"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};