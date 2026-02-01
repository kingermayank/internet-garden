import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Server-side Supabase client for use in Server Components and API routes
// This client can be used in server contexts where cookies are not needed

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export function createServerSupabaseClient() {
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
