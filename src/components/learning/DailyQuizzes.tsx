import React, { useState, useEffect } from 'react';
import { 
  Target, Clock, Zap, Trophy, Star, Play, RotateCcw,
  CheckCircle, XCircle, ArrowRight, Calendar, Flame
} from 'lucide-react';
import { DailyQuiz, QuizQuestion } from '../../types/learning';
import { dailyQuizzes } from '../../data/academicData';

interface DailyQuizzesProps {
  darkMode: boolean;
}

export const DailyQuizzes: React.FC<DailyQuizzesProps> = ({ darkMode }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<DailyQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | number)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizState, setQuizState] = useState<'selection' | 'active' | 'complete'>('selection');
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizState === 'active' && timeRemaining > 0) {
      timer = setTimeout(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (quizState === 'active' && timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, quizState]);

  const startQuiz = (quiz: DailyQuiz) => {
    setSelectedQuiz(quiz);
    setSelectedAnswers(new Array(quiz.questions.length).fill(''));
    setCurrentQuestionIndex(0);
    setTimeRemaining(60); // 60 seconds per question
    setQuizState('active');
  };

  const handleAnswerSelect = (answer: string | number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(60);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    if (!selectedQuiz) return;
    
    let correctAnswers = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    setScore(finalScore);
    setQuizState('complete');
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setTimeRemaining(0);
    setQuizState('selection');
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-blue-600';
    if (streak >= 7) return 'text-green-600';
    return 'text-yellow-600';
  };

  if (quizState === 'active' && selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Quiz Header */}
        <header className={`border-b sticky top-0 z-10 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center transition-colors duration-300 ${
                  timeRemaining <= 10 ? 'text-red-600' : darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            <div className="pb-2">
              <div className={`w-full rounded-full h-1 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Question */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`border rounded-xl p-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.difficulty} • {currentQuestion.points} points
                </span>
              </div>
              <h2 className={`text-2xl font-semibold leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : darkMode
                      ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-gray-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'bg-blue-500 text-white'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={resetQuiz}
                className={`px-6 py-3 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Exit Quiz
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === ''}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'complete' && selectedQuiz) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
              score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {score >= 80 ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : score >= 60 ? (
                <Target className="w-10 h-10 text-yellow-600" />
              ) : (
                <RotateCcw className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Quiz Complete!</h2>
            <p className={`text-xl transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Your Score: <span className="font-bold">{score}%</span></p>
            
            {score >= 80 && (
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className={`font-medium transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Streak maintained! Day {selectedQuiz.streak + 1}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className={`px-8 py-3 border rounded-xl transition-colors ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => startQuiz(selectedQuiz)}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Daily Quizzes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className={`font-medium transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>7 day streak</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Daily Learning Challenge</h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Take a quick quiz every day to reinforce your learning and build a study streak. 
            Each quiz adapts to your progress and focuses on areas that need improvement.
          </p>
        </div>

        {/* Today's Quizzes */}
        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Today's Quizzes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={`border rounded-xl p-6 transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {quiz.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                    <span className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {quiz.isCompleted ? 'Completed' : 'Available'}
                    </span>
                  </div>
                </div>
                
                <h4 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Mathematics Quiz
                </h4>
                <p className={`text-sm mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {quiz.questions.length} questions • {Math.floor(quiz.timeLimit / 60)} minutes
                </p>
                
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-4">
                    <span className={`flex items-center transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Flame className="w-4 h-4 mr-1" />
                      {quiz.streak} day streak
                    </span>
                    <span className={`flex items-center transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Star className="w-4 h-4 mr-1" />
                      {quiz.questions.reduce((sum, q) => sum + q.points, 0)} points
                    </span>
                  </div>
                </div>

                {quiz.isCompleted && quiz.score !== undefined ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>Your Score</span>
                      <span className={`font-bold ${
                        quiz.score >= 80 ? 'text-green-600' : 
                        quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{quiz.score}%</span>
                    </div>
                    <button
                      onClick={() => startQuiz(quiz)}
                      className={`w-full px-4 py-2 border rounded-lg transition-colors ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Streak Information */}
        <div className={`border rounded-xl p-8 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Keep Your Streak Going!</h3>
            <p className={`text-lg mb-6 transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              You're on a 7-day learning streak. Complete today's quizzes to maintain your momentum!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getStreakColor(7)}`}>7</div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Current Streak</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>21</div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Longest Streak</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>85%</div>
                <div className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Average Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};