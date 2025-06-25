import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthUser, AuthState, LoginCredentials, RegisterData } from '../types/auth';
import { supabase, signUp, signIn, signOut, getCurrentUser, updateUserProfile } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

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
  isLoading: true,
  error: null,
};

// Convert Supabase user to AuthUser
const convertSupabaseUser = (user: User): AuthUser => {
  const metadata = user.user_metadata || {};
  
  return {
    id: user.id,
    email: user.email || '',
    username: metadata.username || user.email?.split('@')[0] || '',
    firstName: metadata.firstName || metadata.first_name || '',
    lastName: metadata.lastName || metadata.last_name || '',
    avatar: metadata.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
    bio: metadata.bio || '',
    dateOfBirth: metadata.dateOfBirth ? new Date(metadata.dateOfBirth) : undefined,
    phone: metadata.phone || '',
    location: metadata.location || '',
    joinDate: new Date(user.created_at),
    lastLogin: new Date(),
    isEmailVerified: user.email_confirmed_at !== null,
    preferences: {
      notifications: {
        email: metadata.notifications?.email ?? true,
        push: metadata.notifications?.push ?? true,
        assignments: metadata.notifications?.assignments ?? true,
        grades: metadata.notifications?.grades ?? true,
        announcements: metadata.notifications?.announcements ?? false,
      },
      theme: metadata.theme || 'light',
      language: metadata.language || 'en',
    },
    academicInfo: {
      studentId: metadata.studentId || '',
      major: metadata.major || '',
      year: metadata.year || '',
      gpa: metadata.gpa || 0,
      enrolledSubjects: metadata.enrolledSubjects || [],
    },
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user } = await getCurrentUser();
        if (user) {
          const authUser = convertSupabaseUser(user);
          dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const authUser = convertSupabaseUser(session.user);
          dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
        } else if (event === 'SIGNED_OUT') {
          dispatch({ type: 'LOGOUT' });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const { data, error } = await signIn(credentials.email, credentials.password);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.user) {
        const authUser = convertSupabaseUser(data.user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      };

      const { data: authData, error } = await signUp(data.email, data.password, userData);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (authData.user) {
        const authUser = convertSupabaseUser(authData.user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<AuthUser>): Promise<void> => {
    if (!state.user) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { error } = await updateUserProfile(updates);
      
      if (error) {
        throw new Error(error.message);
      }
      
      dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw new Error(error.message);
    }
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