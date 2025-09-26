import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let cachedServiceClient: SupabaseClient | null = null;

export const createServiceSupabaseClient = (): SupabaseClient => {
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set.');
  }

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set.');
  }

  if (!cachedServiceClient) {
    cachedServiceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return cachedServiceClient;
};

export async function getUserFromRequest(request: Request) {
  const accessToken = request.headers.get('authorization')?.split(' ')[1];
  if (!accessToken) {
    throw new Error('No access token provided');
  }

  const supabase = createServiceSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    throw new Error('Invalid access token');
  }

  return user;
}
