import { createClient } from '@supabase/supabase-js';
import { config } from './env';

// Initialize Supabase Client
// Using serviceRoleKey if available for admin operations, otherwise anonKey
const supabaseKey = config.supabase.serviceRoleKey || config.supabase.anonKey;

export const supabase = createClient(config.supabase.url, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
