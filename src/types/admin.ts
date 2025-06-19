export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'super_admin';
  permissions: AdminPermission[];
  avatar?: string;
  joinDate: Date;
  lastLogin: Date;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'users' | 'analytics' | 'system';
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'video' | 'text' | 'quiz';
  subjectId: string;
  topicId: string;
  content: string | File;
  fileUrl?: string;
  fileSize?: string;
  duration?: number; // for videos
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isPublished: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  rating: number;
  ratingCount: number;
}

export interface QuestionBank {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  subjectId: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  usageCount: number;
  successRate: number;
}

export interface StudentInquiry {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  topic: string;
  question: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'answered' | 'closed';
  createdAt: Date;
  answeredBy?: string;
  answer?: string;
  answeredAt?: Date;
  attachments?: string[];
}

export interface PerformanceReport {
  id: string;
  type: 'individual' | 'subject' | 'overall';
  studentId?: string;
  subjectId?: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: {
    totalStudyTime: number;
    completedLessons: number;
    averageScore: number;
    streakDays: number;
    topicsCompleted: number;
    quizzesCompleted: number;
  };
  generatedAt: Date;
  generatedBy: string;
}