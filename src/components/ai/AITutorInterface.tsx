import React, { useState, useRef } from 'react';
import { 
  Brain, BookOpen, Star, Users, Zap, Plus, 
  ChevronDown, ChevronRight, Sparkles, Play, CheckCircle,
  Clock, Award, Target, Upload, FileText, X, AlertCircle, Search
} from 'lucide-react';
import { subjects } from '../../data/mockData';
import { Subject } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface AITutorInterfaceProps {
  darkMode: boolean;
  onStartChat: () => void;
  onNavigateToSubjects?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStudy?: (subject: Subject, moduleId?: string, lessonId?: string) => void;
}

interface CourseTreeItem {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  isExpanded: boolean;
  modules: ModuleItem[];
  subject: Subject;
}

interface ModuleItem {
  id: string;
  name: string;
  isCompleted: boolean;
  isLocked: boolean;
  lessons: LessonItem[];
}

interface LessonItem {
  id: string;
  name: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number;
  isCompleted: boolean;
  isLocked: boolean;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: Date;
}

interface SearchResult {
  type: 'course' | 'module' | 'lesson';
  id: string;
  name: string;
  courseName: string;
  moduleId?: string;
  lessonId?: string;
  subject: Subject;
}

export const AITutorInterface: React.FC<AITutorInterfaceProps> = ({ 
  darkMode, 
  onStartChat, 
  onNavigateToSubjects,
  onNavigateToDashboard,
  onNavigateToStudy
}) => {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [expandedCourses, setExpandedCourses] = useState<string[]>(['math']);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user's enrolled subjects - filter subjects based on user's academic info
  const userEnrolledSubjects = subjects.filter(subject => {
    // If user has enrolled subjects in their academic info, use those
    if (user?.academicInfo?.enrolledSubjects?.length) {
      return user.academicInfo.enrolledSubjects.includes(subject.id);
    }
    // Otherwise, show all subjects (fallback for demo)
    return true;
  });

  // Get bookmarked subjects from localStorage
  const getBookmarkedSubjects = (): string[] => {
    const saved = localStorage.getItem('bookmarkedSubjects');
    return saved ? JSON.parse(saved) : [];
  };

  // Filter to show only bookmarked subjects if user has any, otherwise show enrolled subjects
  const userSubjects = (() => {
    const bookmarked = getBookmarkedSubjects();
    if (bookmarked.length > 0) {
      return userEnrolledSubjects.filter(subject => bookmarked.includes(subject.id));
    }
    return userEnrolledSubjects;
  })();

  // Convert user's subjects to course tree format
  const courseTree: CourseTreeItem[] = userSubjects.map(subject => ({
    id: subject.id,
    name: subject.name,
    progress: Math.round((subject.completedTopics / subject.totalTopics) * 100),
    totalTopics: subject.totalTopics,
    completedTopics: subject.completedTopics,
    isExpanded: expandedCourses.includes(subject.id),
    modules: generateModulesForSubject(subject),
    subject: subject
  }));

  function generateModulesForSubject(subject: Subject): ModuleItem[] {
    const moduleTemplates = {
      'Mathematics': [
        { name: 'Algebra Fundamentals', lessons: ['Linear Equations', 'Quadratic Functions', 'Polynomial Operations', 'Systems of Equations'] },
        { name: 'Geometry Basics', lessons: ['Angles and Lines', 'Triangles', 'Circles', 'Area and Volume'] },
        { name: 'Calculus Introduction', lessons: ['Limits', 'Derivatives', 'Integration', 'Applications'] }
      ],
      'Physics': [
        { name: 'Classical Mechanics', lessons: ['Motion and Forces', 'Energy and Work', 'Momentum', 'Rotational Motion'] },
        { name: 'Thermodynamics', lessons: ['Heat and Temperature', 'Laws of Thermodynamics', 'Entropy', 'Heat Engines'] },
        { name: 'Electromagnetism', lessons: ['Electric Fields', 'Magnetic Fields', 'Electromagnetic Induction', 'Maxwell Equations'] }
      ],
      'Chemistry': [
        { name: 'Atomic Structure', lessons: ['Atoms and Elements', 'Electron Configuration', 'Periodic Table', 'Chemical Bonding'] },
        { name: 'Chemical Reactions', lessons: ['Types of Reactions', 'Stoichiometry', 'Reaction Rates', 'Equilibrium'] },
        { name: 'Organic Chemistry', lessons: ['Hydrocarbons', 'Functional Groups', 'Reaction Mechanisms', 'Synthesis'] }
      ],
      'Biology': [
        { name: 'Cell Biology', lessons: ['Cell Structure', 'Cell Division', 'Cellular Processes', 'Metabolism'] },
        { name: 'Genetics', lessons: ['DNA and RNA', 'Inheritance', 'Gene Expression', 'Mutations'] },
        { name: 'Evolution', lessons: ['Natural Selection', 'Speciation', 'Phylogeny', 'Evidence for Evolution'] }
      ],
      'History': [
        { name: 'Ancient Civilizations', lessons: ['Mesopotamia', 'Egypt', 'Greece', 'Rome'] },
        { name: 'Medieval Period', lessons: ['Feudalism', 'Crusades', 'Renaissance', 'Reformation'] },
        { name: 'Modern Era', lessons: ['Industrial Revolution', 'World Wars', 'Cold War', 'Contemporary History'] }
      ],
      'Literature': [
        { name: 'Literary Analysis', lessons: ['Theme and Symbolism', 'Character Development', 'Plot Structure', 'Literary Devices'] },
        { name: 'Poetry', lessons: ['Poetic Forms', 'Meter and Rhythm', 'Figurative Language', 'Famous Poets'] },
        { name: 'Creative Writing', lessons: ['Narrative Techniques', 'Dialogue', 'Setting', 'Editing and Revision'] }
      ]
    };

    const templates = moduleTemplates[subject.name as keyof typeof moduleTemplates] || moduleTemplates['Mathematics'];
    
    return templates.map((template, moduleIndex) => ({
      id: `${subject.id}-module-${moduleIndex}`,
      name: template.name,
      isCompleted: moduleIndex < Math.floor(subject.completedTopics / (subject.totalTopics / templates.length)),
      isLocked: moduleIndex > Math.floor(subject.completedTopics / (subject.totalTopics / templates.length)),
      lessons: template.lessons.map((lessonName, lessonIndex) => ({
        id: `${subject.id}-lesson-${moduleIndex}-${lessonIndex}`,
        name: lessonName,
        type: ['video', 'text', 'quiz', 'assignment'][lessonIndex % 4] as 'video' | 'text' | 'quiz' | 'assignment',
        duration: 15 + Math.floor(Math.random() * 30),
        isCompleted: Math.random() > 0.6,
        isLocked: Math.random() > 0.8
      }))
    }));
  }

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results: SearchResult[] = [];
    const searchLower = term.toLowerCase();

    // Only search through the user's enrolled/bookmarked courses
    courseTree.forEach(course => {
      // Search in course names
      if (course.name.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'course',
          id: course.id,
          name: course.name,
          courseName: course.name,
          subject: course.subject
        });
      }

      // Search in modules
      course.modules.forEach(module => {
        if (module.name.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'module',
            id: module.id,
            name: module.name,
            courseName: course.name,
            moduleId: module.id,
            subject: course.subject
          });
        }

        // Search in lessons
        module.lessons.forEach(lesson => {
          if (lesson.name.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'lesson',
              id: lesson.id,
              name: lesson.name,
              courseName: course.name,
              moduleId: module.id,
              lessonId: lesson.id,
              subject: course.subject
            });
          }
        });
      });
    });

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    if (onNavigateToStudy) {
      onNavigateToStudy(result.subject, result.moduleId, result.lessonId);
    }
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const handleGenerateCourse = () => {
    if (selectedTopic.trim()) {
      onStartChat();
    }
  };

  const handleLogoClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleCourseClick = (course: CourseTreeItem) => {
    if (onNavigateToStudy) {
      onNavigateToStudy(course.subject);
    }
  };

  const handleModuleClick = (course: CourseTreeItem, module: ModuleItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigateToStudy && !module.isLocked) {
      onNavigateToStudy(course.subject, module.id);
    }
  };

  const handleLessonClick = (course: CourseTreeItem, module: ModuleItem, lesson: LessonItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigateToStudy && !lesson.isLocked) {
      onNavigateToStudy(course.subject, module.id, lesson.id);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'text': return BookOpen;
      case 'quiz': return Target;
      case 'assignment': return Award;
      default: return BookOpen;
    }
  };

  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'module': return Target;
      case 'lesson': return Play;
      default: return BookOpen;
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      // Check file type
      const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only PDF, DOC, DOCX, or TXT files.');
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.');
        return;
      }

      const newDoc: UploadedDocument = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        uploadDate: new Date()
      };

      setUploadedDocs(prev => [...prev, newDoc]);
    });

    setShowUploadModal(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeDocument = (docId: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== docId));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('text')) return '📃';
    return '📄';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Sidebar */}
      <div className="flex">
        <div className={`w-80 min-h-screen border-r transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            {/* Header - Now Clickable */}
            <button 
              onClick={handleLogoClick}
              className={`flex items-center space-x-3 mb-8 w-full text-left p-2 rounded-lg transition-colors hover:bg-opacity-10 hover:bg-blue-600 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>AI Tutor</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>by LearnPath</p>
              </div>
            </button>

            {/* Description */}
            <p className={`text-sm mb-6 transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your personalized learning companion for any topic
            </p>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Course</span>
              </button>
            </nav>

            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search your courses, modules, lessons..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchTerm && setShowSearchResults(true)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
                }`}>
                  {searchResults.map((result, index) => {
                    const Icon = getResultTypeIcon(result.type);
                    return (
                      <button
                        key={`${result.type}-${result.id}-${index}`}
                        onClick={() => handleSearchResultClick(result)}
                        className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        } ${index !== searchResults.length - 1 ? (darkMode ? 'border-b border-gray-600' : 'border-b border-gray-100') : ''}`}
                      >
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {result.name}
                          </div>
                          <div className={`text-xs transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {result.type === 'course' ? 'Course' : 
                             result.type === 'module' ? `Module in ${result.courseName}` :
                             `Lesson in ${result.courseName}`}
                          </div>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          result.type === 'course' ? 'bg-blue-100 text-blue-800' :
                          result.type === 'module' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {result.type}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* No Results Message */}
              {showSearchResults && searchResults.length === 0 && searchTerm && (
                <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50 p-4 text-center transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
                }`}>
                  <Search className={`w-8 h-8 mx-auto mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No results found in your courses for "{searchTerm}"
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Try searching for a different term or browse your courses below
                  </p>
                </div>
              )}
            </div>

            {/* Click outside to close search results */}
            {showSearchResults && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowSearchResults(false)}
              />
            )}

            {/* Uploaded Documents */}
            {uploadedDocs.length > 0 && (
              <div className="mb-8">
                <h3 className={`text-sm font-semibold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Your Documents</h3>
                
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uploadedDocs.map((doc) => (
                    <div key={doc.id} className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <span className="text-lg">{getFileIcon(doc.type)}</span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-medium truncate transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>{doc.name}</p>
                          <p className={`text-xs transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>{doc.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className={`p-1 rounded transition-colors ${
                          darkMode 
                            ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' 
                            : 'text-gray-400 hover:text-red-600 hover:bg-gray-200'
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Tree - Only User's Courses */}
            <div className="mb-8">
              <h3 className={`text-sm font-semibold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Your Courses</h3>
              
              {courseTree.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className={`w-12 h-12 mx-auto mb-3 transition-colors duration-300 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No courses found
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Bookmark subjects from "My Subjects" to see them here
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {courseTree.map((course) => (
                    <div key={course.id} className="space-y-1">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleCourse(course.id)}
                          className={`p-1 rounded transition-colors ${
                            darkMode 
                              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {course.isExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronRight className="w-3 h-3" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleCourseClick(course)}
                          className={`flex-1 flex items-center justify-between p-2 rounded-lg text-left transition-colors hover:bg-blue-50 hover:border-blue-200 border border-transparent ${
                            darkMode 
                              ? 'text-gray-300 hover:bg-blue-900 hover:border-blue-700' 
                              : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2 flex-1">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-medium truncate">{course.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600">{course.progress}%</span>
                            {course.progress === 100 && (
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            )}
                          </div>
                        </button>
                      </div>

                      {course.isExpanded && (
                        <div className="ml-4 space-y-1">
                          {course.modules.map((module) => (
                            <div key={module.id} className="space-y-1">
                              <button
                                onClick={(e) => handleModuleClick(course, module, e)}
                                disabled={module.isLocked}
                                className={`w-full flex items-center space-x-2 p-1.5 rounded text-xs transition-colors ${
                                  module.isLocked
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-blue-50 hover:border-blue-200 border border-transparent'
                                } ${
                                  module.isCompleted 
                                    ? 'text-green-600' 
                                    : module.isLocked
                                    ? 'text-gray-400'
                                    : darkMode ? 'text-gray-400 hover:bg-blue-900 hover:border-blue-700' : 'text-gray-600'
                                }`}
                              >
                                <div className={`w-2 h-2 rounded-full ${
                                  module.isCompleted 
                                    ? 'bg-green-500' 
                                    : module.isLocked
                                    ? 'bg-gray-400'
                                    : 'bg-blue-500'
                                }`} />
                                <span className="truncate">{module.name}</span>
                              </button>
                              
                              <div className="ml-4 space-y-0.5">
                                {module.lessons.slice(0, 3).map((lesson) => {
                                  const Icon = getTypeIcon(lesson.type);
                                  return (
                                    <button
                                      key={lesson.id}
                                      onClick={(e) => handleLessonClick(course, module, lesson, e)}
                                      disabled={lesson.isLocked}
                                      className={`w-full flex items-center space-x-2 p-1 text-xs transition-colors ${
                                        lesson.isLocked
                                          ? 'opacity-50 cursor-not-allowed'
                                          : 'hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded'
                                      } ${
                                        lesson.isCompleted 
                                          ? 'text-green-600' 
                                          : lesson.isLocked
                                          ? 'text-gray-400'
                                          : darkMode ? 'text-gray-500 hover:bg-blue-900 hover:border-blue-700' : 'text-gray-500'
                                      }`}
                                    >
                                      <Icon className="w-2.5 h-2.5" />
                                      <span className="truncate flex-1 text-left">{lesson.name}</span>
                                      <Clock className="w-2 h-2" />
                                      <span>{lesson.duration}m</span>
                                    </button>
                                  );
                                })}
                                {module.lessons.length > 3 && (
                                  <div className={`text-xs pl-4 ${
                                    darkMode ? 'text-gray-500' : 'text-gray-500'
                                  }`}>
                                    +{module.lessons.length - 3} more lessons
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upgrade Section */}
            <div className={`p-4 rounded-xl border transition-colors duration-300 ${
              darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-800'
                }`}>Upgrade</span>
              </div>
              <p className={`text-xs mb-3 transition-colors duration-300 ${
                darkMode ? 'text-yellow-300' : 'text-yellow-700'
              }`}>
                Get access to all features and benefits of the AI Tutor.
              </p>
              <div className={`w-full bg-yellow-200 rounded-full h-1 mb-2 ${
                darkMode ? 'bg-yellow-800' : 'bg-yellow-200'
              }`}>
                <div className="bg-yellow-600 h-1 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className={`text-xs transition-colors duration-300 ${
                darkMode ? 'text-yellow-400' : 'text-yellow-700'
              }`}>
                100% of the daily limit used
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Banner */}
          <div className={`border-b px-8 py-4 flex items-center justify-between transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              You are on the free plan
            </div>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
              Upgrade to Pro
            </button>
          </div>

          {/* Main Interface */}
          <div className="p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="max-w-2xl w-full">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  What can I help you learn?
                </h1>
                <p className={`text-lg transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Enter a topic below to generate a personalized course for it
                </p>
              </div>

              {/* Input Section */}
              <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <textarea
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  placeholder="e.g. JavaScript Promises, React Hooks, Go Routines etc"
                  className={`w-full h-24 resize-none border-0 outline-none text-lg transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-transparent text-white placeholder-gray-400' 
                      : 'bg-transparent text-gray-900 placeholder-gray-500'
                  }`}
                />
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload Your Own Doc</span>
                    </button>
                    
                    <button
                      onClick={handleGenerateCourse}
                      disabled={!selectedTopic.trim()}
                      className="flex items-center space-x-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Course</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Upload Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <h4 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Drop your files here
              </h4>
              <p className={`text-sm mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                or click to browse
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            <div className={`mt-4 p-3 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Supported formats:</p>
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>PDF, DOC, DOCX, TXT (max 10MB each)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};