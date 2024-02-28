import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const cookiesUser = event.cookies.get('user');
  if (!cookiesUser && !event.url.pathname.includes('/auth')) {
    throw redirect(302, '/auth/sign-in');
  }

  // TODO: Add logic for user

  const response = await resolve(event);

  return response;
};
