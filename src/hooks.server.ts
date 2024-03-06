import { createServerClient } from '@supabase/ssr';
import { type Handle } from '@sveltejs/kit';

import type { ColorScheme } from './app';

import { PUBLIC_THEME_MODE_COOKIE } from '$env/static/public';
import type { Database } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient<Database>(
    import.meta.env.LANG_HUB_SUPABASE_URL,
    import.meta.env.LANG_HUB_SUPABASE_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: '/' });
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: '/' });
        },
      },
    },
  );

  event.locals.getUserSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  event.locals.colorScheme = (event.cookies.get(PUBLIC_THEME_MODE_COOKIE) ||
    'light') as ColorScheme;

  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === 'content-range',
    transformPageChunk: ({ html }) => html.replace('%color-scheme%', event.locals.colorScheme),
  });
};
