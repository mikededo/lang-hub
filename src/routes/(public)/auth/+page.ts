import { redirect } from '@sveltejs/kit';

import { isAuthPath, pathTo } from '$lib/config';

import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  if (isAuthPath(url.pathname)) {
    redirect(302, pathTo('signIn'));
  }
};
