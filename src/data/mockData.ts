import { Subject, QuizQuestion, WeakArea, LearningSession, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  joinDate: new Date('2024-01-15'),
  totalStudyTime: 2840, // minutes
  currentStreak: 12,
  level: 8,
  xp: 2340
};

// Completely empty subjects array - all subjects will be AI-generated/custom only
export const subjects: Subject[] = [];

export const mathQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the derivative of x²?',
    options: ['x', '2x', 'x²', '2x²'],
    correctAnswer: 1,
    explanation: 'The derivative of x² is 2x using the power rule: d/dx(xⁿ) = nxⁿ⁻¹',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'medium',
    timeLimit: 60
  },
  {
    id: '2',
    question: 'Solve for x: 2x + 5 = 13',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: '2x + 5 = 13, so 2x = 8, therefore x = 4',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'easy',
    timeLimit: 45
  },
  {
    id: '3',
    question: 'What is the area of a circle with radius 5?',
    options: ['25π', '10π', '5π', '50π'],
    correctAnswer: 0,
    explanation: 'Area = πr² = π(5)² = 25π',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'medium',
    timeLimit: 60
  }
];

export const weakAreas: WeakArea[] = [
  {
    topic: 'Calculus - Integration',
    subject: 'Mathematics',
    accuracy: 65,
    questionsAttempted: 23,
    lastAttempt: new Date('2024-12-15'),
    improvementSuggestions: [
      'Practice more integration by parts problems',
      'Review fundamental integration rules',
      'Work on trigonometric integrals'
    ]
  },
  {
    topic: 'Organic Chemistry - Reactions',
    subject: 'Chemistry',
    accuracy: 58,
    questionsAttempted: 31,
    lastAttempt: new Date('2024-12-14'),
    improvementSuggestions: [
      'Study reaction mechanisms step by step',
      'Practice naming organic compounds',
      'Review functional group properties'
    ]
  },
  {
    topic: 'Physics - Electromagnetism',
    subject: 'Physics',
    accuracy: 72,
    questionsAttempted: 18,
    lastAttempt: new Date('2024-12-13'),
    improvementSuggestions: [
      'Work on Faraday\'s law applications',
      'Practice magnetic field calculations',
      'Review Maxwell\'s equations'
    ]
  }
];

export const recentSessions: LearningSession[] = [
  {
    id: '1',
    type: 'quiz',
    subject: 'Mathematics',
    duration: 25,
    completedAt: new Date('2024-12-15T10:30:00'),
    score: 85
  },
  {
    id: '2',
    type: 'chat',
    subject: 'Physics',
    duration: 18,
    completedAt: new Date('2024-12-15T09:15:00'),
    topicsDiscussed: ['Quantum Mechanics', 'Wave Functions']
  },
  {
    id: '3',
    type: 'quiz',
    subject: 'Chemistry',
    duration: 22,
    completedAt: new Date('2024-12-14T16:45:00'),
    score: 78
  }
];