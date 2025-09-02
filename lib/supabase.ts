import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for frontend usage
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Client for server/admin usage
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export function getServerAdmin() {
	return supabaseAdmin;
}
