import { createClient } from '@/utils/supabase/client'

export async function verifyLogin() {
  const supabase = createClient();
  const { userData, error } = await supabase.auth.getUser();
  return { userData, error };
}