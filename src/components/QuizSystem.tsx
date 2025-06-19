import React, { useState, useEffect } from 'react';
import { QuizQuestion, Subject } from '../types';
import { Clock, CheckCircle, XCircle, Brain, Trophy, Target, Play, RotateCcw } from 'lucide-react';
import { generateQuizQuestions, calculateScore, analyzeQuizResults } from '../utils/quizGenerator';

interface QuizSystemProps {
  selectedSubject?: Subject;
  onBack: () => void;
  onQuizComplete: (score: number, weakAreas: string[]) => void;
  darkMode: boolean;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({ selectedSubject, onBack, onQuizComplete, darkMode }) => {
  const [quizState, setQuizState] = useState<'setup' | 'active' | 'complete'>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizState === 'active' && timeRemaining > 0) {
      timer = setTimeout(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (quizState === 'active' && timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, quizState]);

  const startQuiz = (questionCount: number = 5) => {
    const quizQuestions = generateQuizQuestions(
      selectedSubject?.name || 'General',
      [],
      questionCount
    );
    setQuestions(quizQuestions);
    setSelectedAnswers(new Array(questionCount).fill(-1));
    setCurrentQuestionIndex(0);
    setTimeRemaining(quizQuestions[0]?.timeLimit || 60);
    setQuizState('active');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeRemaining(questions[nextIndex]?.timeLimit || 60);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const finalScore = calculateScore(questions, selectedAnswers);
    const identifiedWeakAreas = analyzeQuizResults(questions, selectedAnswers);
    
    setScore(finalScore);
    setWeakAreas(identifiedWeakAreas);
    setQuizState('complete');
    onQuizComplete(finalScore, identifiedWeakAreas);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizState === 'setup') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {selectedSubject ? `${selectedSubject.name} Quiz` : 'General Knowledge Quiz'}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Test your knowledge with adaptive questions tailored to your learning level. 
              Get instant feedback and identify areas for improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className={`text-center p-6 border rounded-xl transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Adaptive Questions</h3>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Questions tailored to your current skill level</p>
            </div>
            <div className={`text-center p-6 border rounded-xl transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Timed Challenge</h3>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Each question has a time limit to test your speed</p>
            </div>
            <div className={`text-center p-6 border rounded-xl transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Instant Feedback</h3>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Detailed explanations for every question</p>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <button
              onClick={() => startQuiz(5)}
              className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quick Quiz (5 questions)
            </button>
            <button
              onClick={() => startQuiz(10)}
              className={`w-full flex items-center justify-center px-6 py-4 font-semibold rounded-xl transition-colors ${
                darkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Extended Quiz (10 questions)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'active') {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Progress Header */}
        <div className={`border-b sticky top-0 z-10 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
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
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`border rounded-xl p-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  {currentQuestion.topic}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              <h2 className={`text-2xl font-semibold leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-600 bg-blue-50 text-gray-900'
                      : darkMode
                      ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-gray-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'bg-blue-600 text-white'
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
                onClick={onBack}
                className={`px-6 py-3 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Exit Quiz
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === -1}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete state
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
              <Brain className="w-10 h-10 text-red-600" />
            )}
          </div>
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Quiz Complete!</h2>
          <p className={`text-xl transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Your Score: <span className="font-bold">{score}%</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={`border rounded-xl p-6 text-center transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Questions Answered</h3>
            <p className={`text-3xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>{questions.length}</p>
          </div>
          <div className={`border rounded-xl p-6 text-center transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Correct Answers</h3>
            <p className="text-3xl font-bold text-green-600">
              {Math.round((score / 100) * questions.length)}
            </p>
          </div>
        </div>

        {weakAreas.length > 0 && (
          <div className="mb-12">
            <h3 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Areas for Improvement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weakAreas.map((area, index) => (
                <div key={index} className={`border rounded-xl p-6 transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{area}</h4>
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Consider reviewing this topic with the AI tutor for better understanding.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBack}
            className={`px-8 py-3 border rounded-xl transition-colors ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => startQuiz(questions.length)}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};