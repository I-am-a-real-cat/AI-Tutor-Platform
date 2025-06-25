import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthUser, AuthState, LoginCredentials, RegisterData } from '../types/auth';
import { 
  supabase, 
  signUp, 
  signIn, 
  signOut, 
  getCurrentUser, 
  updateUserProfile,
  getUserProfile,
  updateUserProfileData,
  ensureUserProfile,
  UserProfile
} from '../lib/supabase';
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

// Convert Supabase user and profile to AuthUser
const convertToAuthUser = (user: User, profile?: UserProfile | null): AuthUser => {
  const metadata = user.user_metadata || {};
  
  return {
    id: user.id,
    email: user.email || '',
    username: profile?.username || metadata.username || user.email?.split('@')[0] || '',
    firstName: profile?.first_name || metadata.firstName || metadata.first_name || '',
    lastName: profile?.last_name || metadata.lastName || metadata.last_name || '',
    avatar: profile?.avatar_url || metadata.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
    bio: profile?.bio || metadata.bio || '',
    dateOfBirth: profile?.date_of_birth ? new Date(profile.date_of_birth) : metadata.dateOfBirth ? new Date(metadata.dateOfBirth) : undefined,
    phone: profile?.phone || metadata.phone || '',
    location: profile?.location || metadata.location || '',
    joinDate: new Date(user.created_at),
    lastLogin: new Date(),
    isEmailVerified: user.email_confirmed_at !== null,
    preferences: {
      notifications: {
        email: profile?.preferences?.notifications?.email ?? metadata.notifications?.email ?? true,
        push: profile?.preferences?.notifications?.push ?? metadata.notifications?.push ?? true,
        assignments: profile?.preferences?.notifications?.assignments ?? metadata.notifications?.assignments ?? true,
        grades: profile?.preferences?.notifications?.grades ?? metadata.notifications?.grades ?? true,
        announcements: profile?.preferences?.notifications?.announcements ?? metadata.notifications?.announcements ?? false,
      },
      theme: profile?.preferences?.theme || metadata.theme || 'light',
      language: profile?.preferences?.language || metadata.language || 'en',
    },
    academicInfo: {
      studentId: profile?.academic_info?.studentId || metadata.studentId || '',
      major: profile?.academic_info?.major || metadata.major || '',
      year: profile?.academic_info?.year || metadata.year || '',
      gpa: profile?.academic_info?.gpa || metadata.gpa || 0,
      enrolledSubjects: profile?.academic_info?.enrolledSubjects || metadata.enrolledSubjects || [],
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
          // Ensure user profile exists and get it
          const { data: profile } = await ensureUserProfile(user.id, user.user_metadata);
          const authUser = convertToAuthUser(user, profile);
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
          try {
            // Ensure user profile exists and get it
            const { data: profile } = await ensureUserProfile(session.user.id, session.user.user_metadata);
            const authUser = convertToAuthUser(session.user, profile);
            dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
          } catch (error) {
            console.error('Error handling sign in:', error);
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Failed to load user profile' });
          }
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
        // Ensure user profile exists and get it
        const { data: profile } = await ensureUserProfile(data.user.id, data.user.user_metadata);
        const authUser = convertToAuthUser(data.user, profile);
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
        // The profile will be created automatically by the trigger
        // But let's ensure it exists and get it
        setTimeout(async () => {
          try {
            const { data: profile } = await ensureUserProfile(authData.user!.id, userData);
            const authUser = convertToAuthUser(authData.user!, profile);
            dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
          } catch (error) {
            console.error('Error creating user profile after signup:', error);
            // Still allow login even if profile creation fails
            const authUser = convertToAuthUser(authData.user!, null);
            dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
          }
        }, 1000);
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
      // Prepare profile updates for database
      const profileUpdates: Partial<UserProfile> = {
        first_name: updates.firstName,
        last_name: updates.lastName,
        bio: updates.bio,
        date_of_birth: updates.dateOfBirth?.toISOString().split('T')[0],
        phone: updates.phone,
        location: updates.location,
        avatar_url: updates.avatar,
        academic_info: updates.academicInfo,
        preferences: updates.preferences,
      };

      // Remove undefined values
      Object.keys(profileUpdates).forEach(key => {
        if (profileUpdates[key as keyof UserProfile] === undefined) {
          delete profileUpdates[key as keyof UserProfile];
        }
      });

      // Update profile in database
      const { error: profileError } = await updateUserProfileData(state.user.id, profileUpdates);
      
      if (profileError) {
        throw new Error(profileError.message);
      }

      // Also update auth metadata for some fields
      const authUpdates: any = {};
      if (updates.firstName) authUpdates.firstName = updates.firstName;
      if (updates.lastName) authUpdates.lastName = updates.lastName;
      if (updates.avatar) authUpdates.avatar = updates.avatar;

      if (Object.keys(authUpdates).length > 0) {
        const { error: authError } = await updateUserProfile(authUpdates);
        if (authError) {
          console.warn('Failed to update auth metadata:', authError.message);
        }
      }
      
      dispatch({ type: 'UPDATE_PROFILE', payload: updates });
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
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