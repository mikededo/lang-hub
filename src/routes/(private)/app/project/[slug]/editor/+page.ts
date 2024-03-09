
import { Keys } from '$lib/config';
import { getProject } from '$lib/db';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
  const projectId = params.slug;

  // Required in case the user navigates to the editor directly
  const { queryClient, supabaseClient } = await parent();
  const phrases = await queryClient.ensureQueryData({
    queryKey: Keys.PROJECT_PHRASES(projectId),
    queryFn: async () => await getProject(supabaseClient, +projectId),
  });

  return { projectId, phrases };
};
