<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import { Keys } from '$lib/config';
  import { getProjects } from '$lib/db';
  import { ProjectCard, ProjectSkeleton, ProjectsGrid } from '$lib/domain/project';

  const query = createQuery({
    queryKey: Keys.PROJECTS,
    queryFn: getProjects,
  });
</script>

<div class="w-full h-full">
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
        <ProjectCard {project} />
      {/each}
    </ProjectsGrid>
  {/if}
</div>
