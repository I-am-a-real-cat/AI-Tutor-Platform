/*
  # Fix user profiles creation and management

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, nullable, unique when not null)
      - `first_name` (text, default empty string)
      - `last_name` (text, default empty string)
      - `bio` (text, nullable)
      - `date_of_birth` (date, nullable)
      - `phone` (text, nullable)
      - `location` (text, nullable)
      - `avatar_url` (text, nullable)
      - `academic_info` (jsonb, default empty object)
      - `preferences` (jsonb, default with notification settings)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for users to read and update their own profiles
    - Allow public read access to basic profile info

  3. Functions and Triggers
    - Create function to handle new user profile creation
    - Create trigger to automatically create profiles on user signup
    - Create function to update updated_at timestamp
*/

-- Create the user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  bio text,
  date_of_birth date,
  phone text,
  location text,
  avatar_url text,
  academic_info jsonb DEFAULT '{}',
  preferences jsonb DEFAULT '{
    "notifications": {
      "email": true,
      "push": true,
      "assignments": true,
      "grades": true,
      "announcements": false
    },
    "theme": "light",
    "language": "en"
  }',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own full profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_profiles;

-- Create new policies
CREATE POLICY "Users can read own full profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow public read access to basic profile info (needed for app functionality)
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles
  FOR SELECT
  USING (true);

-- Create or replace function to handle updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;

-- Create trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Drop existing trigger and function for user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to automatically create profile on user signup with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_username text;
  username_counter integer := 0;
BEGIN
  -- Generate a base username
  new_username := COALESCE(
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'first_name',
    split_part(new.email, '@', 1)
  );
  
  -- If no username could be generated, use a default
  IF new_username IS NULL OR new_username = '' THEN
    new_username := 'user' || floor(random() * 10000)::text;
  END IF;
  
  -- Ensure username is unique by appending numbers if needed
  WHILE EXISTS (SELECT 1 FROM public.user_profiles WHERE username = new_username) LOOP
    username_counter := username_counter + 1;
    new_username := COALESCE(
      new.raw_user_meta_data->>'username',
      new.raw_user_meta_data->>'firstName',
      new.raw_user_meta_data->>'first_name',
      split_part(new.email, '@', 1)
    ) || username_counter::text;
    
    -- Prevent infinite loop
    IF username_counter > 1000 THEN
      new_username := 'user' || floor(random() * 100000)::text;
      EXIT;
    END IF;
  END LOOP;

  -- Insert the new profile with comprehensive error handling
  BEGIN
    INSERT INTO public.user_profiles (
      id,
      username,
      first_name,
      last_name,
      avatar_url
    )
    VALUES (
      new.id,
      new_username,
      COALESCE(new.raw_user_meta_data->>'firstName', new.raw_user_meta_data->>'first_name', ''),
      COALESCE(new.raw_user_meta_data->>'lastName', new.raw_user_meta_data->>'last_name', ''),
      COALESCE(
        new.raw_user_meta_data->>'avatar',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.email
      )
    );
  EXCEPTION
    WHEN unique_violation THEN
      -- If username is still not unique, try with a random suffix
      new_username := 'user' || floor(random() * 100000)::text;
      INSERT INTO public.user_profiles (
        id,
        username,
        first_name,
        last_name,
        avatar_url
      )
      VALUES (
        new.id,
        new_username,
        COALESCE(new.raw_user_meta_data->>'firstName', new.raw_user_meta_data->>'first_name', ''),
        COALESCE(new.raw_user_meta_data->>'lastName', new.raw_user_meta_data->>'last_name', ''),
        COALESCE(
          new.raw_user_meta_data->>'avatar',
          'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.email
        )
      );
    WHEN OTHERS THEN
      -- Log the error but don't fail the user creation
      RAISE WARNING 'Failed to create user profile for user %: %', new.id, SQLERRM;
  END;
  
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Make username nullable (in case the constraint was added before)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' 
    AND column_name = 'username' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE user_profiles ALTER COLUMN username DROP NOT NULL;
  END IF;
END $$;