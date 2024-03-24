import { getContext, setContext } from 'svelte';

import type { Client } from '$lib/db';

const CONTEXT_KEY = 'supabase:client';

export const setSupabaseClient = (client: Client) => {
  setContext(CONTEXT_KEY, client);
};

export const getSupabaseClient = () => {
  const context = getContext<Client>(CONTEXT_KEY);
  if (!context) {
    throw new Error(
      'Unable to find Subapabase client on the tree. Make sure to use `setClient` on the root component.',
    );
  }

  return context;
};
