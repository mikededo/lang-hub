<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import type { PageData } from './$types';

  import { Container } from '$lib/components';
  import { Keys } from '$lib/config';
  import type { ProjectWithLanguages } from '$lib/db';
  import { getProject, getProjects } from '$lib/db';
  import {
    CreateProjectCard,
    CreateProjectDialog,
    ProjectCard,
    ProjectSkeleton,
    ProjectsGrid,
  } from '$lib/domain/project';

  export let data: PageData;
  const { queryClient, supabaseClient } = data;

  const query = createQuery({
    queryKey: Keys.PROJECTS,
    queryFn: () => getProjects(supabaseClient),
  });

  const handleOnPrefetch = (id: ProjectWithLanguages['id']) => {
    queryClient.prefetchQuery({
      queryKey: Keys.PROJECT(`${id}`),
      queryFn: async () => await getProject(supabaseClient, id),
    });
  };
</script>

<Container class="h-full w-full">
  {#if $query.isLoading}
    <ProjectsGrid>
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </ProjectsGrid>
  {:else if !$query.data}
    <div>Empty state</div>
  {:else}
    <ProjectsGrid>
      {#each $query.data as project (project.id)}
        <ProjectCard {project} onPrefetch={handleOnPrefetch} />
      {/each}
      <CreateProjectCard />
    </ProjectsGrid>
  {/if}
</Container>
<CreateProjectDialog {supabaseClient} />
