import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TutorChat } from './components/TutorChat';
import { QuizSystem } from './components/QuizSystem';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { SubjectDashboard } from './components/subjects/SubjectDashboard';
import { SubjectInfoPage } from './components/subjects/SubjectInfoPage';
import { StudyDashboard } from './components/analytics/StudyDashboard';
import { Navbar } from './components/common/Navbar';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Subject } from './types';
import { CoreSubject } from './types/learning';
import { mockUser, subjects, weakAreas, recentSessions } from './data/mockData';

type AppState = 'dashboard' | 'chat' | 'quiz' | 'profile' | 'subjects' | 'subject-info' | 'analytics' | 'admin' | 'catalog' | 'daily-quizzes' | 'forums' | 'ai-tutor';
type AuthState = 'login' | 'register';

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const [currentView, setCurrentView] = useState<AppState>('dashboard');
  const [authView, setAuthView] = useState<AuthState>('login');
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>(undefined);
  const [selectedCoreSubject, setSelectedCoreSubject] = useState<CoreSubject | undefined>(undefined);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarkedSubjects');
    return saved ? JSON.parse(saved) : [];
  });

  // Check if user is admin (mock check)
  const isAdmin = user?.email === 'admin@example.com';

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('bookmarkedSubjects', JSON.stringify(bookmarkedSubjects));
  }, [bookmarkedSubjects]);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView('subject-info');
  };

  const handleSelectCoreSubject = (subject: CoreSubject) => {
    setSelectedCoreSubject(subject);
    // Convert CoreSubject to Subject for compatibility
    const convertedSubject: Subject = {
      id: subject.id,
      name: subject.name,
      icon: 'BookOpen',
      description: subject.description,
      color: subject.color,
      totalTopics: subject.topics.length,
      completedTopics: subject.topics.filter(t => t.isCompleted).length,
      difficulty: subject.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'
    };
    setSelectedSubject(convertedSubject);
    setCurrentView('subject-info');
  };

  const handleStartChat = () => {
    setSelectedSubject(undefined);
    setCurrentView('ai-tutor');
  };

  const handleStartQuiz = () => {
    setSelectedSubject(undefined);
    setCurrentView('quiz');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSubject(undefined);
    setSelectedCoreSubject(undefined);
  };

  const handleQuizComplete = (score: number, weakAreasIdentified: string[]) => {
    console.log('Quiz completed:', { score, weakAreasIdentified });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleBookmark = (subjectId: string) => {
    setBookmarkedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleNavigation = (view: AppState) => {
    setCurrentView(view);
  };

  const handleNavigateToSubjects = () => {
    setCurrentView('subjects');
  };

  // If not authenticated, show auth pages
  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <RegisterPage 
          onSwitchToLogin={() => setAuthView('login')}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      );
    }
    
    return (
      <LoginPage 
        onSwitchToRegister={() => setAuthView('register')}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  // Authenticated user views
  switch (currentView) {
    case 'profile':
      return (
        <div 
          className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
        >
          <Navbar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <ProfilePage
            onBack={handleBackToDashboard}
            darkMode={darkMode}
          />
        </div>
      );
    case 'subjects':
      return (
        <div 
          className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
        >
          <Navbar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <SubjectDashboard
            onBack={handleBackToDashboard}
            darkMode={darkMode}
            onSelectSubject={handleSelectSubject}
          />
        </div>
      );
    case 'subject-info':
      return selectedSubject ? (
        <SubjectInfoPage
          subject={selectedSubject}
          onBack={handleBackToDashboard}
          darkMode={darkMode}
          isBookmarked={bookmarkedSubjects.includes(selectedSubject.id)}
          onToggleBookmark={toggleBookmark}
        />
      ) : (
        <div>Subject not found</div>
      );
    case 'analytics':
      return (
        <div 
          className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
        >
          <Navbar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <StudyDashboard
            onBack={handleBackToDashboard}
            darkMode={darkMode}
          />
        </div>
      );
    case 'ai-tutor':
      return (
        <TutorChat
          selectedSubject={selectedSubject}
          onBack={handleBackToDashboard}
          darkMode={darkMode}
          onNavigateToSubjects={handleNavigateToSubjects}
        />
      );
    case 'chat':
      return (
        <div 
          className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
        >
          <Navbar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <TutorChat
            selectedSubject={selectedSubject}
            onBack={handleBackToDashboard}
            darkMode={darkMode}
            onNavigateToSubjects={handleNavigateToSubjects}
          />
        </div>
      );
    case 'quiz':
      return (
        <div 
          className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
        >
          <Navbar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <QuizSystem
            selectedSubject={selectedSubject}
            onBack={handleBackToDashboard}
            onQuizComplete={handleQuizComplete}
            darkMode={darkMode}
          />
        </div>
      );
    default:
      return (
        <div 
          className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
        >
          <Navbar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <Dashboard
            user={mockUser}
            subjects={subjects}
            weakAreas={weakAreas}
            recentSessions={recentSessions}
            onSelectSubject={handleSelectSubject}
            onStartChat={handleStartChat}
            onStartQuiz={handleStartQuiz}
            darkMode={darkMode}
            bookmarkedSubjects={bookmarkedSubjects}
            onToggleBookmark={toggleBookmark}
            onNavigateToSubjects={handleNavigateToSubjects}
          />
        </div>
      );
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;