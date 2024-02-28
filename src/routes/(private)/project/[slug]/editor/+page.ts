import type { PageLoad } from './$types';

import { Keys } from '$lib/config';
import { getProjectPhrasesAndTranslations } from '$lib/db';

export const load: PageLoad = async ({ params, parent }) => {
  const projectId = params.slug;

  // Required in case the user navigates to the editor directly
  const { queryClient } = await parent();
  const phrases = await queryClient.ensureQueryData({
    queryKey: Keys.PROJECT_PHRASES(projectId),
    queryFn: async () => await getProjectPhrasesAndTranslations(+projectId),
  });

  return { projectId, phrases };
};
