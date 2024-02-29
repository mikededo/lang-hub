import type { PageLoad } from './$types';

import { Keys } from '$lib/config';
import { getProjects } from '$lib/db';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabaseClient } = await parent();

  queryClient.prefetchQuery({
    queryKey: Keys.PROJECTS,
    queryFn: () => getProjects(supabaseClient),
  });
};
