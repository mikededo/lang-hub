import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';

import { isAuthPath, pathTo } from '$lib/config';

export const load: PageLoad = ({ url }) => {
  if (isAuthPath(url.pathname)) {
    redirect(302, pathTo('signIn'));
  }
};
