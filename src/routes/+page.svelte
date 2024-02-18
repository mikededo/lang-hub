<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import type { PageData } from './$types';

  import { Container } from '$lib/components';
  import { Keys } from '$lib/config';
  import type { ProjectWithLanguages } from '$lib/db';
  import { getProject, getProjects } from '$lib/db';
  import { ProjectCard, ProjectSkeleton, ProjectsGrid } from '$lib/domain/project';

  export let data: PageData;

  const query = createQuery({
    queryKey: Keys.PROJECTS,
    queryFn: getProjects,
  });

  const handleOnPrefetch = (id: ProjectWithLanguages['id']) => {
    data.queryClient.prefetchQuery({
      queryKey: Keys.PROJECT(`${id}`),
      queryFn: async () => await getProject(id),
    });
  };
</script>

<Container class="w-full h-full">
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
    </ProjectsGrid>
  {/if}
</Container>
