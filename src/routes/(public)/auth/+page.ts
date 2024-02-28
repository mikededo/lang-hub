import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  if (url.pathname === '/auth') {
    redirect(302, '/auth/sign-in');
  }
};
