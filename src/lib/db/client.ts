import { createClient } from '@supabase/supabase-js';

import type { Database } from '$lib/types';

export const supabaseClient = createClient<Database>(
  import.meta.env.LANG_HUB_SUPABASE_URL,
  import.meta.env.LANG_HUB_SUPABASE_KEY,
  {},
);
