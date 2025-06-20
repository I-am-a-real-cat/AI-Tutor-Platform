import React, { useState } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, Users, Star, Play, CheckCircle, 
  Lock, Award, Target, TrendingUp, Calendar, FileText, Video,
  Bookmark, BookmarkCheck
} from 'lucide-react';
import { Subject } from '../../types';
import { StudyPage } from '../study/StudyPage';

interface SubjectInfoPageProps {
  subject: Subject;
  onBack: () => void;
  darkMode: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (subjectId: string) => void;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isCompleted: boolean;
  isLocked: boolean;
  estimatedTime: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export const SubjectInfoPage: React.FC<SubjectInfoPageProps> = ({ 
  subject, 
  onBack, 
  darkMode, 
  isBookmarked, 
  onToggleBookmark 
}) => {
  const [showStudyPage, setShowStudyPage] = useState(false);

  // Mock data for the subject modules and lessons
  const modules: Module[] = [
    {
      id: '1',
      title: 'Introduction to Angular',
      description: 'Learn the basics of Angular framework and its core concepts',
      isCompleted: true,
      isLocked: false,
      estimatedTime: 180,
      lessons: [
        { id: '1', title: 'What is Angular and Why Use It?', type: 'video', duration: 15, isCompleted: true, isLocked: false },
        { id: '2', title: 'Setting Up Your Development Environment', type: 'text', duration: 20, isCompleted: true, isLocked: false },
        { id: '3', title: 'Understanding Angular CLI', type: 'video', duration: 25, isCompleted: true, isLocked: false },
        { id: '4', title: 'Creating Your First Angular Project', type: 'assignment', duration: 30, isCompleted: true, isLocked: false },
        { id: '5', title: 'Project Structure Overview', type: 'text', duration: 15, isCompleted: true, isLocked: false },
        { id: '6', title: 'Running and Testing Your Application', type: 'video', duration: 20, isCompleted: true, isLocked: false }
      ]
    },
    {
      id: '2',
      title: 'Components and Templates',
      description: 'Master Angular components and template syntax',
      isCompleted: false,
      isLocked: false,
      estimatedTime: 240,
      lessons: [
        { id: '7', title: 'Understanding Angular Components', type: 'video', duration: 25, isCompleted: false, isLocked: false },
        { id: '8', title: 'Creating and Using Components', type: 'assignment', duration: 35, isCompleted: false, isLocked: false },
        { id: '9', title: 'Template Syntax and Data Binding', type: 'text', duration: 30, isCompleted: false, isLocked: false },
        { id: '10', title: 'Event Handling', type: 'video', duration: 20, isCompleted: false, isLocked: false }
      ]
    },
    {
      id: '3',
      title: 'Data Binding and Directives',
      description: 'Learn about data binding and built-in directives',
      isCompleted: false,
      isLocked: true,
      estimatedTime: 200,
      lessons: [
        { id: '11', title: 'Two-way Data Binding', type: 'video', duration: 25, isCompleted: false, isLocked: true },
        { id: '12', title: 'Structural Directives', type: 'text', duration: 30, isCompleted: false, isLocked: true },
        { id: '13', title: 'Attribute Directives', type: 'video', duration: 25, isCompleted: false, isLocked: true }
      ]
    },
    {
      id: '4',
      title: 'Services and Dependency Injection',
      description: 'Understanding services and dependency injection patterns',
      isCompleted: false,
      isLocked: true,
      estimatedTime: 220,
      lessons: [
        { id: '14', title: 'Creating Services', type: 'video', duration: 30, isCompleted: false, isLocked: true },
        { id: '15', title: 'Dependency Injection', type: 'text', duration: 25, isCompleted: false, isLocked: true }
      ]
    },
    {
      id: '5',
      title: 'Routing and Navigation',
      description: 'Implement routing and navigation in Angular applications',
      isCompleted: false,
      isLocked: true,
      estimatedTime: 180,
      lessons: [
        { id: '16', title: 'Setting Up Routes', type: 'video', duration: 25, isCompleted: false, isLocked: true },
        { id: '17', title: 'Route Parameters', type: 'text', duration: 20, isCompleted: false, isLocked: true }
      ]
    },
    {
      id: '6',
      title: 'Forms and Validation',
      description: 'Working with forms and form validation',
      isCompleted: false,
      isLocked: true,
      estimatedTime: 200,
      lessons: [
        { id: '18', title: 'Template-driven Forms', type: 'video', duration: 30, isCompleted: false, isLocked: true },
        { id: '19', title: 'Reactive Forms', type: 'assignment', duration: 35, isCompleted: false, isLocked: true }
      ]
    },
    {
      id: '7',
      title: 'HTTP Client and API Communication',
      description: 'Learn to communicate with APIs using HTTP client',
      isCompleted: false,
      isLocked: true,
      estimatedTime: 160,
      lessons: [
        { id: '20', title: 'Making HTTP Requests', type: 'video', duration: 25, isCompleted: false, isLocked: true },
        { id: '21', title: 'Error Handling', type: 'text', duration: 20, isCompleted: false, isLocked: true }
      ]
    }
  ];

  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
  const completedLessons = modules.reduce((total, module) => 
    total + module.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'text': return FileText;
      case 'quiz': return Target;
      case 'assignment': return Award;
      default: return FileText;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleBackToSubjects = () => {
    // This will navigate to the subjects page
    onBack();
  };

  const handleStartStudy = () => {
    setShowStudyPage(true);
  };

  const handleBackFromStudy = () => {
    setShowStudyPage(false);
  };

  if (showStudyPage) {
    return (
      <StudyPage 
        subject={subject}
        onBack={handleBackFromStudy}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSubjects}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Back to My Subjects</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>100% of the daily limit used</span>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium">
                🔄 Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {subject.name} Fundamentals for Beginners
              </h1>
              <div className="flex items-center space-x-6 text-sm">
                <span className={`transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  7 modules • {totalLessons} lessons • {progressPercentage}% complete
                </span>
              </div>
            </div>
            <button
              onClick={() => onToggleBookmark(subject.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-blue-600 hover:text-blue-700'
                  : darkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {progressPercentage}% Completed
              </span>
              <span className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Outline Tab Header */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
              <FileText className="w-4 h-4 mr-2" />
              Outline
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Course Outline */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <div
                  key={module.id}
                  className={`border rounded-xl p-6 transition-colors duration-300 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  {/* Module Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        module.isCompleted 
                          ? 'bg-green-500 text-white' 
                          : module.isLocked
                          ? 'bg-gray-300 text-gray-600'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {module.isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : module.isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-bold">{moduleIndex + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {formatDuration(module.estimatedTime)}
                    </span>
                  </div>

                  {/* Module Lessons */}
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const Icon = getTypeIcon(lesson.type);
                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                            lesson.isLocked
                              ? darkMode ? 'bg-gray-700 opacity-50' : 'bg-gray-50 opacity-50'
                              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                          } ${lesson.isCompleted ? 'border-l-4 border-green-500' : ''}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              lesson.isCompleted 
                                ? 'bg-green-500 text-white' 
                                : lesson.isLocked
                                ? 'bg-gray-400 text-gray-600'
                                : 'bg-blue-500 text-white'
                            }`}>
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : lesson.isLocked ? (
                                <Lock className="w-3 h-3" />
                              ) : (
                                <Icon className="w-3 h-3" />
                              )}
                            </div>
                            <div>
                              <h4 className={`font-medium transition-colors duration-300 ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {lesson.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-xs">
                                <span className={`transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                </span>
                                <span className={`transition-colors duration-300 ${
                                  darkMode ? 'text-gray-500' : 'text-gray-500'
                                }`}>•</span>
                                <span className={`transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {formatDuration(lesson.duration)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!lesson.isLocked && (
                              <button 
                                onClick={handleStartStudy}
                                className={`text-sm font-medium transition-colors ${
                                  lesson.isCompleted 
                                    ? 'text-green-600 hover:text-green-700'
                                    : 'text-blue-600 hover:text-blue-700'
                                }`}
                              >
                                {lesson.isCompleted ? 'Review' : 'Start'} →
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`border rounded-xl p-6 sticky top-8 transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Course Progress
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Completed</span>
                  <span className={`font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{progressPercentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Lessons</span>
                  <span className={`font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{completedLessons}/{totalLessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Difficulty</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Beginner
                  </span>
                </div>
              </div>

              <button 
                onClick={handleStartStudy}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};