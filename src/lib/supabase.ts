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
  username?: string;
  first_name?: string;
  last_name?: string;
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
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) {
      console.error('Supabase signup error:', error)
      throw error
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Signup error:', error)
    return { data: null, error }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Supabase signin error:', error)
      throw error
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Signin error:', error)
    return { data: null, error }
  }
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
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching user profile:', error)
      return { data: null, error }
    }
    
    return { data: data || null, error: null }
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return { data: null, error }
  }
}

export const updateUserProfileData = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    )
    
    const { data, error } = await supabase
      .from('user_profiles')
      .update(cleanUpdates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user profile:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Error in updateUserProfileData:', error)
    return { data: null, error }
  }
}

export const createUserProfile = async (profile: Partial<UserProfile>) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user profile:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Error in createUserProfile:', error)
    return { data: null, error }
  }
}

// Helper function to ensure user profile exists
export const ensureUserProfile = async (userId: string, userData?: any): Promise<{ data: UserProfile | null, error: any }> => {
  try {
    // First try to get existing profile
    const { data: existingProfile, error: fetchError } = await getUserProfile(userId)
    
    if (existingProfile) {
      return { data: existingProfile, error: null }
    }
    
    // If no profile exists, create one
    const { data: user } = await getCurrentUser()
    if (!user) {
      return { data: null, error: new Error('No authenticated user') }
    }
    
    const profileData: Partial<UserProfile> = {
      id: userId,
      username: userData?.username || user.email?.split('@')[0] || '',
      first_name: userData?.firstName || userData?.first_name || '',
      last_name: userData?.lastName || userData?.last_name || '',
      avatar_url: userData?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      preferences: {
        notifications: {
          email: true,
          push: true,
          assignments: true,
          grades: true,
          announcements: false
        },
        theme: 'light',
        language: 'en'
      }
    }
    
    return await createUserProfile(profileData)
  } catch (error) {
    console.error('Error in ensureUserProfile:', error)
    return { data: null, error }
  }
}