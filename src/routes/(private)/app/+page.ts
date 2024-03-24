import { Keys } from '$lib/config';
import { getAvailableLanguages, getProjects } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, supabaseClient } = await parent();

  // Should only be fetched once as the data is static
  queryClient.prefetchQuery({
    queryKey: Keys.LANGUAGES,
    queryFn: () => getAvailableLanguages(supabaseClient),
    staleTime: Infinity,
  });

  queryClient.prefetchQuery({
    queryKey: Keys.PROJECTS,
    queryFn: () => getProjects(supabaseClient),
  });
};
