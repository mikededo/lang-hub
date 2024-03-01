import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => ({ session: (await parent()).session });
