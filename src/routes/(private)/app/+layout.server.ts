import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { pathTo } from '$lib/config';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getUserSession();
  if (!session) {
    redirect(302, pathTo('signIn'));
  }

  return { colorScheme: locals.colorScheme };
};
