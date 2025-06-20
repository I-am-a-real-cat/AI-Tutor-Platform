import React, { useState } from 'react';
import { 
  Search, Filter, Calendar, Clock, Users, BookOpen, 
  Star, ChevronRight, Bell, Award, TrendingUp, Play,
  FileText, Video, Link, Download, AlertCircle, Bookmark, BookmarkCheck, Camera, X, Trash2, Brain
} from 'lucide-react';
import { Subject } from '../../types';

interface SubjectDashboardProps {
  onBack: () => void;
  darkMode: boolean;
  onSelectSubject?: (subject: Subject) => void;
  subjects?: Subject[];
  onDeleteSubject?: (subjectId: string) => void;
}

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ 
  onBack, 
  darkMode, 
  onSelectSubject,
  subjects: propSubjects,
  onDeleteSubject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bookmark' | 'finish'>('all');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedSubjectForImage, setSelectedSubjectForImage] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarkedSubjects');
    return saved ? JSON.parse(saved) : [];
  });

  // ONLY use subjects from props (which come from localStorage) - no fallback to any default subjects
  const subjects = propSubjects || [];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isBookmarked = bookmarkedSubjects.includes(subject.id);
    const isFinished = (subject.completedTopics / subject.totalTopics) === 1;
    
    if (selectedFilter === 'bookmark') {
      return matchesSearch && isBookmarked;
    } else if (selectedFilter === 'finish') {
      return matchesSearch && isFinished;
    }
    
    return matchesSearch;
  });

  const handleBookmarkClick = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    const newBookmarkedSubjects = bookmarkedSubjects.includes(subjectId) 
      ? bookmarkedSubjects.filter(id => id !== subjectId)
      : [...bookmarkedSubjects, subjectId];
    
    setBookmarkedSubjects(newBookmarkedSubjects);
    localStorage.setItem('bookmarkedSubjects', JSON.stringify(newBookmarkedSubjects));
  };

  const handleDeleteClick = (e: React.MouseEvent, subjectId: string, subjectName: string) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete "${subjectName}"? This action cannot be undone.`)) {
      if (onDeleteSubject) {
        onDeleteSubject(subjectId);
      }
    }
  };

  const handleSubjectClick = (subject: Subject) => {
    if (onSelectSubject) {
      onSelectSubject(subject);
    }
  };

  const handleImageChangeClick = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    setSelectedSubjectForImage(subjectId);
    setShowImageModal(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (selectedSubjectForImage) {
      setCustomImages(prev => ({
        ...prev,
        [selectedSubjectForImage]: imageUrl
      }));
    }
    setShowImageModal(false);
    setSelectedSubjectForImage(null);
  };

  const handleCreateFirstCourse = () => {
    // Navigate to AI Tutor
    window.location.hash = 'ai-tutor';
    onBack(); // This will trigger navigation to AI Tutor
  };

  // Function to get current topic name for each subject
  const getCurrentTopicName = (subjectName: string, completedTopics: number): string => {
    const topicMap: Record<string, string[]> = {
      'JavaScript': ['Variables & Data Types', 'Functions', 'Objects & Arrays', 'DOM Manipulation', 'Event Handling', 'Async Programming', 'ES6+ Features', 'Error Handling'],
      'React': ['Components', 'JSX', 'Props & State', 'Event Handling', 'Lifecycle Methods', 'Hooks', 'Context API', 'Routing'],
      'Python': ['Variables & Data Types', 'Control Flow', 'Functions', 'Classes & Objects', 'File I/O', 'Libraries', 'Error Handling', 'Testing'],
      'Machine Learning': ['Data Preprocessing', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Model Evaluation', 'Feature Engineering', 'Deep Learning', 'Deployment']
    };
    
    const topics = topicMap[subjectName] || ['Introduction', 'Fundamentals', 'Intermediate Concepts', 'Advanced Topics', 'Best Practices', 'Real-world Applications', 'Project Work', 'Mastery'];
    return topics[Math.min(completedTopics, topics.length - 1)] || 'Advanced Topics';
  };

  // Function to get subject-specific header images
  const getSubjectHeaderImage = (subjectName: string, subjectId: string): string => {
    // Check if there's a custom image for this subject
    if (customImages[subjectId]) {
      return customImages[subjectId];
    }

    const imageMap: Record<string, string> = {
      'JavaScript': 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'React': 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Python': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Machine Learning': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Data Science': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Web Development': 'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    };
    
    return imageMap[subjectName] || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2';
  };

  // Predefined image options for each subject
  const getImageOptions = (subjectName: string) => {
    const imageOptions: Record<string, { url: string; title: string }[]> = {
      'JavaScript': [
        { url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Code on Screen' },
        { url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Programming Setup' },
        { url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Web Development' },
        { url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Coding Environment' }
      ],
      'React': [
        { url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'React Development' },
        { url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Frontend Code' },
        { url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Component Development' },
        { url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'UI Development' }
      ],
      'Python': [
        { url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Python Programming' },
        { url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Data Science' },
        { url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Machine Learning' },
        { url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'AI Development' }
      ]
    };

    return imageOptions[subjectName] || [
      { url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Learning Materials' },
      { url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Study Resources' },
      { url: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Educational Content' },
      { url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Course Materials' }
    ];
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>My Subjects</h1>
          <p className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Manage your custom subjects and AI-generated courses</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'bookmark', label: 'Bookmark', icon: Bookmark },
              { id: 'finish', label: 'Finish', icon: Award }
            ].map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id as any)}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => {
              const progress = (subject.completedTopics / subject.totalTopics) * 100;
              const isBookmarked = bookmarkedSubjects.includes(subject.id);
              const isFinished = progress === 100;
              const currentTopicName = getCurrentTopicName(subject.name, subject.completedTopics);
              
              return (
                <div
                  key={subject.id}
                  onClick={() => handleSubjectClick(subject)}
                  className={`group cursor-pointer border rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {/* Header Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={getSubjectHeaderImage(subject.name, subject.id)}
                      alt={subject.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Action Icons */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <button
                        onClick={(e) => handleImageChangeClick(e, subject.id)}
                        className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                        title="Change image"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                      
                      <button
                        onClick={(e) => handleDeleteClick(e, subject.id, subject.name)}
                        className="w-8 h-8 bg-red-500/80 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete subject"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Subject Icon */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-lg">{subject.name.charAt(0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {subject.name}
                    </h3>
                    <p className={`text-sm mb-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{subject.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className={`transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {subject.completedTopics}/{subject.totalTopics} topics: {isFinished ? 'Completed!' : currentTopicName}
                        </span>
                        <span className={`font-medium transition-colors duration-300 ${
                          isFinished ? 'text-green-600' : darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{Math.round(progress)}%</span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isFinished ? 'bg-green-500' : `bg-gradient-to-r ${subject.color}`
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-gray-300">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => handleBookmarkClick(e, subject.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isBookmarked
                              ? 'text-blue-600 hover:text-blue-700'
                              : darkMode
                              ? 'text-gray-400 hover:text-gray-300'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                        {isFinished && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Award className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          subject.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          subject.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subject.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{isFinished ? 'Review' : 'Continue'}</span>
                        <ChevronRight className={`w-4 h-4 group-hover:text-blue-600 transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>No subjects found</h3>
            <p className={`mb-6 transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {selectedFilter === 'bookmark' ? 'No bookmarked subjects yet. Create some courses with the AI Tutor!' :
               selectedFilter === 'finish' ? 'No completed subjects yet. Complete subjects to see them here.' :
               'No subjects available. Create your first course using the AI Tutor!'}
            </p>
            <button
              onClick={handleCreateFirstCourse}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Brain className="w-5 h-5 mr-2" />
              Create Your First Course
            </button>
          </div>
        )}
      </div>

      {/* Image Selection Modal */}
      {showImageModal && selectedSubjectForImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-xl p-6 max-h-[80vh] overflow-y-auto transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Choose Header Image</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {getImageOptions(
                subjects.find(s => s.id === selectedSubjectForImage)?.name || 'General'
              ).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(option.url)}
                  className={`group relative overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-400 transition-all duration-200 ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={option.url}
                    alt={option.title}
                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {option.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className={`mt-6 p-4 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Select an image to customize the header of your subject card. You can change it anytime by clicking the camera icon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};