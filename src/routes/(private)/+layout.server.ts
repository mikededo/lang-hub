import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getUserSession();
  if (!session) {
    redirect(302, '/auth/sign-in');
  }

  return {};
};
