export interface AcademicLevel {
  id: string;
  name: string;
  description: string;
  subjects: string[];
}

export interface CoreSubject {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  color: string;
  academicLevel: string;
  topics: Topic[];
  totalLessons: number;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  order: number;
  lessons: Lesson[];
  isCompleted: boolean;
  progress: number;
  estimatedTime: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  topicId: string;
  type: 'video' | 'text' | 'interactive' | 'quiz';
  content: LessonContent;
  duration: number;
  order: number;
  isCompleted: boolean;
  isBookmarked: boolean;
  lastAccessed?: Date;
  completedAt?: Date;
}

export interface LessonContent {
  id: string;
  type: 'pdf' | 'doc' | 'video' | 'text' | 'interactive';
  title: string;
  url?: string;
  text?: string;
  videoUrl?: string;
  fileSize?: string;
  downloadable: boolean;
}

export interface DailyQuiz {
  id: string;
  date: Date;
  subjectId: string;
  questions: QuizQuestion[];
  timeLimit: number;
  isCompleted: boolean;
  score?: number;
  completedAt?: Date;
  streak: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  userAnswer?: string | number;
  isCorrect?: boolean;
  timeSpent?: number;
}

export interface DiscussionForum {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  posts: ForumPost[];
  isActive: boolean;
  createdAt: Date;
  lastActivity: Date;
  participantCount: number;
}

export interface ForumPost {
  id: string;
  forumId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  replies: ForumReply[];
  isSticky: boolean;
  isLocked: boolean;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  contentType: 'lesson' | 'topic' | 'forum_post' | 'quiz';
  contentId: string;
  title: string;
  description?: string;
  subjectId: string;
  createdAt: Date;
  tags: string[];
}

export interface StudentProgress {
  userId: string;
  subjectId: string;
  topicsCompleted: number;
  totalTopics: number;
  lessonsCompleted: number;
  totalLessons: number;
  averageScore: number;
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
  level: number;
  xp: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: string;
  earnedAt: Date;
}