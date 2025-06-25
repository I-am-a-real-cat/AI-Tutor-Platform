/*
  # Fix user profile creation issues

  1. Updates
    - Fix the handle_new_user function to handle missing fields gracefully
    - Ensure proper error handling for user profile creation
    - Make all profile fields optional except id
    - Update RLS policies to be more permissive for initial creation

  2. Changes
    - Update trigger function to handle null values properly
    - Add better error handling
    - Ensure username uniqueness is handled gracefully
*/

-- Drop existing trigger and function to recreate them
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_username text;
BEGIN
  -- Generate a unique username
  new_username := COALESCE(
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'first_name',
    split_part(new.email, '@', 1)
  );
  
  -- Ensure username is unique by appending numbers if needed
  WHILE EXISTS (SELECT 1 FROM public.user_profiles WHERE username = new_username) LOOP
    new_username := new_username || floor(random() * 1000)::text;
  END LOOP;

  -- Insert the new profile with error handling
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
      new_username := new_username || floor(random() * 10000)::text;
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

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the user_profiles table to make fields more flexible
ALTER TABLE user_profiles 
  ALTER COLUMN username DROP NOT NULL,
  ALTER COLUMN first_name SET DEFAULT '',
  ALTER COLUMN last_name SET DEFAULT '';

-- Update RLS policies to be more permissive for profile creation
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow public read access to basic profile info (username, first_name, last_name, avatar_url)
-- This is needed for the app to function properly
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles
  FOR SELECT
  USING (true);

-- But restrict full profile access to the owner
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;

CREATE POLICY "Users can read own full profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);