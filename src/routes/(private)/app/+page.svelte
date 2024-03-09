<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';


  import { Container } from '$lib/components';
  import { Keys } from '$lib/config';
  import type { ProjectWithLanguages } from '$lib/db';
  import { getAvailableLanguages, getProject, getProjects } from '$lib/db';
  import {
    CreateProjectCard,
    CreateProjectDialog,
    ProjectCard,
    ProjectSkeleton,
    ProjectsGrid,
  } from '$lib/domain/project';

  import type { PageData } from './$types';

  export let data: PageData;
  const { queryClient, supabaseClient } = data;

  const projectsQuery = createQuery({
    queryKey: Keys.PROJECTS,
    queryFn: () => getProjects(supabaseClient),
  });
  const languagesQuery = createQuery({
    queryKey: Keys.LANGUAGES,
    queryFn: () => getAvailableLanguages(supabaseClient),
  });

  const handleOnPrefetch = (id: ProjectWithLanguages['id']) => {
    queryClient.prefetchQuery({
      queryKey: Keys.PROJECT(`${id}`),
      queryFn: async () => await getProject(supabaseClient, id),
    });
  };
</script>

<Container class="h-full w-full">
  {#if $projectsQuery.isLoading}
    <ProjectsGrid>
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </ProjectsGrid>
  {:else if !$projectsQuery.data}
    <div>Empty state</div>
  {:else}
    <ProjectsGrid>
      {#each $projectsQuery.data as project (project.id)}
        <ProjectCard {project} onPrefetch={handleOnPrefetch} />
      {/each}
      <CreateProjectCard />
    </ProjectsGrid>
  {/if}
</Container>
<CreateProjectDialog
  {supabaseClient}
  loading={$languagesQuery.isLoading}
  languages={$languagesQuery.data}
/>
