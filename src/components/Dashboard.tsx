import React, { useState } from 'react';
import { User, Subject, WeakArea, LearningSession } from '../types';
import { Brain, Target, ArrowRight, BookOpen, Bookmark, BookmarkCheck, ExternalLink, Camera, X, Trash2 } from 'lucide-react';

interface DashboardProps {
  user: User;
  subjects: Subject[];
  weakAreas: WeakArea[];
  recentSessions: LearningSession[];
  onSelectSubject: (subject: Subject) => void;
  onStartChat: () => void;
  onStartQuiz: () => void;
  darkMode: boolean;
  bookmarkedSubjects: string[];
  onToggleBookmark: (subjectId: string) => void;
  onNavigateToSubjects?: () => void;
  onDeleteSubject?: (subjectId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  subjects,
  weakAreas,
  recentSessions,
  onSelectSubject,
  onStartChat,
  onStartQuiz,
  darkMode,
  bookmarkedSubjects,
  onToggleBookmark,
  onNavigateToSubjects,
  onDeleteSubject
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedSubjectForImage, setSelectedSubjectForImage] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  // Filter subjects to only show bookmarked ones
  const bookmarkedSubjectsList = subjects.filter(subject => bookmarkedSubjects.includes(subject.id));
  
  const totalProgress = bookmarkedSubjectsList.length > 0 
    ? bookmarkedSubjectsList.reduce((acc, subject) => acc + (subject.completedTopics / subject.totalTopics), 0) / bookmarkedSubjectsList.length * 100
    : 0;

  const handleBookmarkClick = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    onToggleBookmark(subjectId);
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
    onSelectSubject(subject);
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

  // Function to get current topic name for each subject
  const getCurrentTopicName = (subjectName: string, completedTopics: number): string => {
    const topicMap: Record<string, string[]> = {
      'Mathematics': ['Derivatives', 'Integration', 'Limits', 'Series', 'Functions', 'Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Probability', 'Calculus', 'Linear Algebra', 'Differential Equations', 'Complex Numbers', 'Matrices', 'Vectors', 'Sequences', 'Logarithms', 'Exponentials', 'Polynomials', 'Rational Functions', 'Conic Sections', 'Parametric Equations', 'Polar Coordinates'],
      'Physics': ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Mechanics', 'Waves', 'Relativity', 'Nuclear Physics', 'Atomic Physics', 'Fluid Dynamics', 'Oscillations', 'Gravitation', 'Energy', 'Momentum', 'Electric Fields', 'Magnetic Fields', 'Circuits', 'Semiconductors', 'Superconductivity', 'Particle Physics'],
      'Chemistry': ['Organic Reactions', 'Molecular Structure', 'Kinetics', 'Equilibrium', 'Thermochemistry', 'Electrochemistry', 'Acids and Bases', 'Redox Reactions', 'Chemical Bonding', 'Periodic Trends', 'Gas Laws', 'Solutions', 'Crystallography', 'Spectroscopy', 'Catalysis', 'Polymers', 'Biochemistry', 'Environmental Chemistry'],
      'Biology': ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Molecular Biology', 'Physiology', 'Anatomy', 'Biochemistry', 'Microbiology', 'Botany', 'Zoology', 'Immunology', 'Neurobiology', 'Developmental Biology', 'Marine Biology', 'Conservation Biology', 'Biotechnology', 'Bioinformatics', 'Pharmacology', 'Toxicology', 'Epidemiology', 'Bioethics'],
      'History': ['Ancient Civilizations', 'Medieval Period', 'Renaissance', 'Modern Era', 'World Wars', 'Cold War', 'Industrial Revolution', 'American Revolution', 'French Revolution', 'Roman Empire', 'Greek Civilization', 'Egyptian History', 'Asian History', 'African History', 'European History', 'Colonial Period'],
      'Literature': ['Poetry Analysis', 'Novel Studies', 'Literary Criticism', 'Creative Writing', 'Shakespeare', 'Modern Literature', 'Classical Literature', 'American Literature', 'British Literature', 'World Literature', 'Drama', 'Short Stories', 'Essays', 'Rhetoric']
    };
    
    const topics = topicMap[subjectName] || ['General Topics'];
    // Return the topic at the current progress index (completedTopics represents the next topic to learn)
    return topics[Math.min(completedTopics, topics.length - 1)] || 'Advanced Topics';
  };

  // Function to get subject-specific header images
  const getSubjectHeaderImage = (subjectName: string, subjectId: string): string => {
    // Check if there's a custom image for this subject
    if (customImages[subjectId]) {
      return customImages[subjectId];
    }

    const imageMap: Record<string, string> = {
      'Mathematics': 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Physics': 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Chemistry': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Biology': 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'History': 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Literature': 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      // Default for custom subjects
      'JavaScript': 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'React': 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
      'Python': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    };
    
    return imageMap[subjectName] || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2';
  };

  // Predefined image options for each subject
  const getImageOptions = (subjectName: string) => {
    const imageOptions: Record<string, { url: string; title: string }[]> = {
      'Mathematics': [
        { url: 'https://images.pexels.com/photos/6256/mathematics-blackboard-education-classroom.jpg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Blackboard with Equations' },
        { url: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Mathematical Formulas' },
        { url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Calculator and Notes' },
        { url: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Geometric Shapes' }
      ],
      'Physics': [
        { url: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Laboratory Equipment' },
        { url: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Physics Formulas' },
        { url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Scientific Instruments' },
        { url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Atomic Structure' }
      ],
      'Chemistry': [
        { url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Laboratory Glassware' },
        { url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Chemical Reactions' },
        { url: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Molecular Models' },
        { url: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Periodic Table' }
      ],
      'Biology': [
        { url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Microscopic View' },
        { url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Cell Structure' },
        { url: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'DNA Helix' },
        { url: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Plant Biology' }
      ],
      'History': [
        { url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Ancient Books' },
        { url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Historical Documents' },
        { url: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Ancient Artifacts' },
        { url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Historical Maps' }
      ],
      'Literature': [
        { url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Classic Literature' },
        { url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Poetry Books' },
        { url: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Writing Desk' },
        { url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Manuscript' }
      ],
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
        { url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'AI Development' }
      ]
    };

    return imageOptions[subjectName] || imageOptions['Literature'];
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome back, <span className="text-blue-600">{user.name}</span>
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Continue your personalized learning journey with AI-powered tutoring and adaptive quizzes
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={onStartChat}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start AI Tutoring
            </button>
            <button
              onClick={onStartQuiz}
              className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <Target className="w-5 h-5 mr-2" />
              Daily Practice
            </button>
          </div>
        </div>

        {/* Learning Paths */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Learning Paths</h2>
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{bookmarkedSubjectsList.length} bookmarked subjects</span>
          </div>
          
          {bookmarkedSubjectsList.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>No Learning Paths Yet</h3>
              <p className={`mb-6 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Create your first course using the AI Tutor to get started with personalized learning
              </p>
              <button
                onClick={onStartChat}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Brain className="w-5 h-5 mr-2" />
                Create Your First Course
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {bookmarkedSubjectsList.map((subject) => {
                  const progress = (subject.completedTopics / subject.totalTopics) * 100;
                  const isBookmarked = bookmarkedSubjects.includes(subject.id);
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
                              {subject.completedTopics}/{subject.totalTopics} topics: {currentTopicName}
                            </span>
                            <span className={`font-medium transition-colors duration-300 ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{Math.round(progress)}%</span>
                          </div>
                          <div className={`w-full rounded-full h-2 ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
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
                            }`}>Continue</span>
                            <ArrowRight className={`w-4 h-4 group-hover:text-blue-600 transition-colors ${
                              darkMode ? 'text-gray-400' : 'text-gray-400'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Go to My Subjects Button */}
              {onNavigateToSubjects && (
                <div className="text-center">
                  <button
                    onClick={onNavigateToSubjects}
                    className={`inline-flex items-center px-6 py-3 border-2 border-dashed rounded-xl font-medium transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-blue-900 hover:text-blue-200 hover:border-blue-400' 
                        : 'border-gray-300 text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Go to My Subjects
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
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
                subjects.find(s => s.id === selectedSubjectForImage)?.name || 'Literature'
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