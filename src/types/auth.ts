export interface AuthUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  dateOfBirth?: Date;
  phone?: string;
  location?: string;
  joinDate: Date;
  lastLogin: Date;
  isEmailVerified: boolean;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      assignments: boolean;
      grades: boolean;
      announcements: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  academicInfo: {
    studentId?: string;
    major?: string;
    year?: string;
    gpa?: number;
    enrolledSubjects: string[];
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}