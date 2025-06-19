import React, { useState } from 'react';
import { 
  Search, Filter, BookOpen, Clock, Users, Star, 
  Play, Download, Bookmark, ChevronRight, Award,
  GraduationCap, Target, TrendingUp
} from 'lucide-react';
import { CoreSubject, AcademicLevel } from '../../types/learning';
import { coreSubjects, academicLevels } from '../../data/academicData';

interface SubjectCatalogProps {
  darkMode: boolean;
  onSelectSubject: (subject: CoreSubject) => void;
}

export const SubjectCatalog: React.FC<SubjectCatalogProps> = ({ darkMode, onSelectSubject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'progress'>('name');

  const filteredSubjects = coreSubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || subject.academicLevel === selectedLevel;
    const matchesDifficulty = selectedDifficulty === 'all' || subject.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesLevel && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressForSubject = (subjectId: string) => {
    // Mock progress calculation
    const totalTopics = coreSubjects.find(s => s.id === subjectId)?.topics.length || 0;
    const completedTopics = coreSubjects.find(s => s.id === subjectId)?.topics.filter(t => t.isCompleted).length || 0;
    return totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  };

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
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Subject Catalog</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Academic Level Selection */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Choose Your Academic Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicLevels.map((level) => (
              <div
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`cursor-pointer border rounded-xl p-6 transition-all duration-200 ${
                  selectedLevel === level.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : darkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    level.id === 'high_school' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <GraduationCap className={`w-6 h-6 ${
                      level.id === 'high_school' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{level.name}</h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{level.description}</p>
                    <p className={`text-xs mt-1 transition-colors duration-300 ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>{level.subjects.length} subjects available</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
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
          
          <div className="flex gap-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="name">Sort by Name</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="progress">Sort by Progress</option>
            </select>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => {
            const progress = getProgressForSubject(subject.id);
            
            return (
              <div
                key={subject.id}
                onClick={() => onSelectSubject(subject)}
                className={`group cursor-pointer border rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(subject.difficulty)}`}>
                      {subject.difficulty}
                    </div>
                    <button className={`p-1.5 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}>
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {subject.name}
                </h3>
                <p className={`text-sm mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{subject.code}</p>
                <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{subject.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className={`w-4 h-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{subject.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className={`w-4 h-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{subject.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className={`w-4 h-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{subject.credits} credits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className={`w-4 h-4 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{subject.topics.length} topics</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className={`transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Progress</span>
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

                {/* Prerequisites */}
                {subject.prerequisites && subject.prerequisites.length > 0 && (
                  <div className="mb-4">
                    <p className={`text-xs font-medium mb-2 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {subject.prerequisites.map((prereq, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-gray-300">
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    <Play className="w-4 h-4" />
                    <span>Start Learning</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Explore</span>
                    <ChevronRight className={`w-4 h-4 group-hover:text-blue-500 transition-colors ${
                      darkMode ? 'text-gray-400' : 'text-gray-400'
                    }`} />
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
            }`}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};