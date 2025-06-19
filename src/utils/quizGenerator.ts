import { QuizQuestion } from '../types';
import { mathQuestions } from '../data/mockData';

export const generateQuizQuestions = (subject: string, weakAreas: string[], count: number = 5): QuizQuestion[] => {
  // For demo purposes, return math questions
  // In a real app, this would generate questions based on AI analysis of weak areas
  return mathQuestions.slice(0, count).map((q, index) => ({
    ...q,
    id: `${subject}-${Date.now()}-${index}`,
    subject: subject
  }));
};

export const analyzeQuizResults = (questions: QuizQuestion[], answers: number[]): string[] => {
  const weakTopics: string[] = [];
  
  questions.forEach((question, index) => {
    if (answers[index] !== question.correctAnswer) {
      if (!weakTopics.includes(question.topic)) {
        weakTopics.push(question.topic);
      }
    }
  });
  
  return weakTopics;
};

export const calculateScore = (questions: QuizQuestion[], answers: number[]): number => {
  let correct = 0;
  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correct++;
    }
  });
  
  return Math.round((correct / questions.length) * 100);
};