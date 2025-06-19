export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  totalStudyTime: number;
  currentStreak: number;
  level: number;
  xp: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  totalTopics: number;
  completedTopics: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  subject?: string;
  isTyping?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
}

export interface QuizResult {
  id: string;
  subjectId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  weakAreas: string[];
  completedAt: Date;
}

export interface WeakArea {
  topic: string;
  subject: string;
  accuracy: number;
  questionsAttempted: number;
  lastAttempt: Date;
  improvementSuggestions: string[];
}

export interface LearningSession {
  id: string;
  type: 'chat' | 'quiz';
  subject: string;
  duration: number;
  completedAt: Date;
  score?: number;
  topicsDiscussed?: string[];
}