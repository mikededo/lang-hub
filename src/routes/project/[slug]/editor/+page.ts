import type { PageLoad } from './$types';

import { Keys } from '$lib/config';
import { getProject } from '$lib/db';

export const load: PageLoad = async ({ params, parent }) => {
  const projectId = params.slug;

  // Required in case the user navigates to the editor directly
  const { queryClient } = await parent();
  const project = await queryClient.ensureQueryData({
    queryKey: Keys.PROJECT(projectId),
    queryFn: async () => await getProject(+projectId),
  });

  return { projectId, project };
};
