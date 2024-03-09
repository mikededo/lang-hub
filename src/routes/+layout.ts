import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';

import type { LayoutLoad } from './$types';


export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabaseClient = createBrowserClient(
    import.meta.env.LANG_HUB_SUPABASE_URL,
    import.meta.env.LANG_HUB_SUPABASE_KEY,
    {
      global: { fetch },
      cookies: {
        get(key) {
          if (!isBrowser()) {
            return JSON.stringify(data.session);
          }

          const cookie = parse(document.cookie);
          return cookie[key];
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000,
      },
    },
  });

  return { queryClient, supabaseClient, session };
};
