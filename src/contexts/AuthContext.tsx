import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthUser, AuthState, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<AuthUser> }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Mock user data for demo
const mockUser: AuthUser = {
  id: '1',
  email: 'alex.johnson@university.edu',
  username: 'alexj',
  firstName: 'Alex',
  lastName: 'Johnson',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  bio: 'Computer Science student passionate about AI and machine learning.',
  dateOfBirth: new Date('2000-05-15'),
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: new Date('2024-01-15'),
  lastLogin: new Date(),
  isEmailVerified: true,
  preferences: {
    notifications: {
      email: true,
      push: true,
      assignments: true,
      grades: true,
      announcements: false,
    },
    theme: 'light',
    language: 'en',
  },
  academicInfo: {
    studentId: 'CS2024001',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.8,
    enrolledSubjects: ['math', 'physics', 'chemistry'],
  },
};

// Helper function to convert date strings back to Date objects
const convertDatesToObjects = (user: any): AuthUser => {
  return {
    ...user,
    dateOfBirth: new Date(user.dateOfBirth),
    joinDate: new Date(user.joinDate),
    lastLogin: new Date(user.lastLogin),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored auth data on app load
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const user = convertDatesToObjects(parsedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const user = { ...mockUser, lastLogin: new Date() };
        
        if (credentials.rememberMe) {
          localStorage.setItem('authUser', JSON.stringify(user));
        }
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: AuthUser = {
        ...mockUser,
        id: Date.now().toString(),
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        joinDate: new Date(),
        lastLogin: new Date(),
        academicInfo: {
          ...mockUser.academicInfo,
          enrolledSubjects: [],
        },
      };
      
      localStorage.setItem('authUser', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('authUser');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (updates: Partial<AuthUser>): Promise<void> => {
    if (!state.user) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};