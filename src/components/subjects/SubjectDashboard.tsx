import React, { useState } from 'react';
import { 
  Search, Filter, Calendar, Clock, Users, BookOpen, 
  Star, ChevronRight, Bell, Award, TrendingUp, Play,
  FileText, Video, Link, Download, AlertCircle, Bookmark, BookmarkCheck, Camera, X
} from 'lucide-react';
import { EnhancedSubject } from '../../types/subjects';
import { enhancedSubjects } from '../../data/enhancedSubjects';
import { subjects } from '../../data/mockData';
import { Subject } from '../../types';

interface SubjectDashboardProps {
  onBack: () => void;
  darkMode: boolean;
  onSelectSubject?: (subject: Subject) => void;
}

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ onBack, darkMode, onSelectSubject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bookmark' | 'finish'>('all');
  const [selectedSubject, setSelectedSubject] = useState<EnhancedSubject | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedSubjectForImage, setSelectedSubjectForImage] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarkedSubjects');
    return saved ? JSON.parse(saved) : [];
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'waitlist': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'link': return Link;
      default: return FileText;
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    const newBookmarkedSubjects = bookmarkedSubjects.includes(subjectId) 
      ? bookmarkedSubjects.filter(id => id !== subjectId)
      : [...bookmarkedSubjects, subjectId];
    
    setBookmarkedSubjects(newBookmarkedSubjects);
    localStorage.setItem('bookmarkedSubjects', JSON.stringify(newBookmarkedSubjects));
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
      'Literature': 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    };
    
    return imageMap[subjectName] || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2';
  };

  // Predefined image options for each subject
  const getImageOptions = (subjectName: string) => {
    const imageOptions: Record<string, { url: string; title: string }[]> = {
      'Mathematics': [
        { url: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Mathematical Formulas' },
        { url: 'https://images.pexels.com/photos/6256/mathematics-blackboard-education-classroom.jpg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2', title: 'Blackboard with Equations' },
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
      ]
    };

    return imageOptions[subjectName] || imageOptions['Literature'];
  };

  if (selectedSubject) {
    return (
      <div 
        className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedSubject(null)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{selectedSubject.name}</h1>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{selectedSubject.code}</p>
            </div>
            <div className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedSubject.enrollmentStatus)}`}>
              {selectedSubject.enrollmentStatus}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Overview */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Course Overview</h2>
                <p className={`mb-6 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{selectedSubject.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.credits}</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Credits</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{Math.round((selectedSubject.progress.completedTopics / selectedSubject.progress.totalTopics) * 100)}%</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Progress</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.grades.current}</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Grade</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.capacity.current}/{selectedSubject.capacity.max}</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Enrolled</div>
                  </div>
                </div>
              </div>

              {/* Assignments */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Assignments</h2>
                
                <div className="space-y-4">
                  {selectedSubject.assignments.map((assignment) => (
                    <div key={assignment.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                      darkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className={`font-semibold transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>{assignment.title}</h3>
                          <p className={`text-sm transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>{assignment.description}</p>
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${getAssignmentStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className={`flex items-center transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {assignment.dueDate.toLocaleDateString()}
                          </span>
                          <span className={`transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {assignment.maxPoints} points
                          </span>
                        </div>
                        {assignment.grade && (
                          <span className={`font-semibold transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Grade: {assignment.grade}/{assignment.maxPoints}
                          </span>
                        )}
                      </div>
                      
                      {assignment.feedback && (
                        <div className={`mt-3 p-3 rounded-lg transition-colors duration-300 ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <p className={`text-sm transition-colors duration-300 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <strong>Feedback:</strong> {assignment.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Course Materials</h2>
                
                <div className="space-y-3">
                  {selectedSubject.materials.map((material) => {
                    const Icon = getMaterialIcon(material.type);
                    return (
                      <div key={material.id} className={`flex items-center justify-between p-4 border rounded-lg transition-colors duration-300 ${
                        darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-5 h-5 transition-colors duration-300 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className={`font-medium transition-colors duration-300 ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{material.title}</h3>
                            <p className={`text-sm transition-colors duration-300 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {material.description} {material.size && `• ${material.size}`}
                            </p>
                          </div>
                        </div>
                        <button className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}>
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor Info */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Instructor</h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={selectedSubject.instructor.avatar}
                    alt={selectedSubject.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-medium transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.instructor.name}</h4>
                    <p className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{selectedSubject.instructor.title}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <strong>Office Hours:</strong> {selectedSubject.instructor.officeHours}
                  </p>
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <strong>Location:</strong> {selectedSubject.instructor.officeLocation}
                  </p>
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <strong>Email:</strong> {selectedSubject.instructor.email}
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Days</p>
                    <p className={`transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.schedule.days.join(', ')}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Time</p>
                    <p className={`transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.schedule.time}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Location</p>
                    <p className={`transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{selectedSubject.schedule.location}</p>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className={`border rounded-xl p-6 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Bell className="w-5 h-5 mr-2" />
                  Announcements
                </h3>
                
                <div className="space-y-3">
                  {selectedSubject.announcements.map((announcement) => (
                    <div key={announcement.id} className={`p-3 border rounded-lg transition-colors duration-300 ${
                      darkMode ? 'border-gray-600' : 'border-gray-200'
                    } ${!announcement.isRead ? (darkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium text-sm transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{announcement.title}</h4>
                        {announcement.priority === 'high' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{announcement.content}</p>
                      <p className={`text-xs mt-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {announcement.publishDate.toLocaleDateString()} • {announcement.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(109, 148, 231, 1) 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>My Subjects</h1>
          <p className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Manage your enrolled subjects and bookmark your favorites</p>
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
                  
                  {/* Change Image Icon */}
                  <button
                    onClick={(e) => handleImageChangeClick(e, subject.id)}
                    className="absolute top-3 left-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    title="Change image"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>

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

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>No subjects found</h3>
            <p className={`transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {selectedFilter === 'bookmark' ? 'No bookmarked subjects yet. Bookmark subjects to see them here.' :
               selectedFilter === 'finish' ? 'No completed subjects yet. Complete subjects to see them here.' :
               'Try adjusting your search criteria'}
            </p>
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