import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio?: string;
  date_of_birth?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  academic_info?: {
    studentId?: string;
    major?: string;
    year?: string;
    gpa?: number;
    enrolledSubjects?: string[];
  };
  preferences?: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      assignments?: boolean;
      grades?: boolean;
      announcements?: boolean;
    };
    theme?: string;
    language?: string;
  };
  created_at: string;
  updated_at: string;
}

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const updateUserProfile = async (updates: any) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates
  })
  return { data, error }
}

// Profile helper functions
export const getUserProfile = async (userId: string): Promise<{ data: UserProfile | null, error: any }> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export const updateUserProfileData = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const createUserProfile = async (profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single()
  
  return { data, error }
}