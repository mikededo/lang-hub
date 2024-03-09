import { redirect } from '@sveltejs/kit';

import { pathTo } from '$lib/config';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getUserSession();
  if (!session) {
    redirect(302, pathTo('signIn'));
  }

  return { colorScheme: locals.colorScheme };
};
