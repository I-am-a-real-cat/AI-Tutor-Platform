export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  department: string;
  bio?: string;
  officeHours?: string;
  officeLocation?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  maxPoints: number;
  submissionType: 'file' | 'text' | 'quiz';
  status: 'upcoming' | 'active' | 'overdue' | 'completed';
  submittedAt?: Date;
  grade?: number;
  feedback?: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  uploadDate: Date;
  size?: string;
  description?: string;
}

export interface EnhancedSubject {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: Instructor;
  credits: number;
  semester: string;
  year: number;
  schedule: {
    days: string[];
    time: string;
    location: string;
  };
  enrollmentStatus: 'enrolled' | 'available' | 'waitlist' | 'closed';
  capacity: {
    current: number;
    max: number;
  };
  prerequisites?: string[];
  materials: Material[];
  assignments: Assignment[];
  announcements: Announcement[];
  grades: {
    current: number;
    breakdown: {
      assignments: number;
      midterm: number;
      final: number;
      participation: number;
    };
  };
  progress: {
    completedTopics: number;
    totalTopics: number;
    lastAccessed: Date;
  };
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
}