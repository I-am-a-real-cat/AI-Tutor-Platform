import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Brain, AlertCircle, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../types/auth';

interface LoginPageProps {
  onSwitchToRegister: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister, darkMode, onToggleDarkMode }) => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          } border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="max-w-md w-full mx-4">
          <div className={`border rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Reset Password</h2>
              <p className={`mt-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Enter your email to receive reset instructions</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="email"
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Send Reset Link
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={onToggleDarkMode}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        } border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Brain className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to LearnPath</h1>
          <p className="text-xl text-white/90 mb-8">
            Your personalized AI-powered learning companion for academic excellence
          </p>
          <div className="space-y-4 text-white/80">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span>Adaptive AI tutoring</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span>Personalized learning paths</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span>Real-time progress tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>LearnPath</h1>
          </div>

          <div className={`border rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Sign In</h2>
              <p className={`mt-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Welcome back! Please sign in to continue</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="email"
                    required
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="demo@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                  />
                  <span className={`ml-2 text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800 text-sm font-medium mb-2">Demo Credentials:</p>
              <p className="text-blue-700 text-xs">Email: demo@example.com</p>
              <p className="text-blue-700 text-xs">Password: password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};