<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { ArrowLeftIcon } from 'lucide-svelte';

  import type { PageData } from './$types';

  import { Container } from '$lib/components';
  import { Keys, Paths } from '$lib/config';
  import { getProject } from '$lib/db';
  import { CreatePhraseButton, PhrasesList, PhrasesListSkeleton } from '$lib/domain/phrases';

  export let data: PageData;

  const query = createQuery({
    queryKey: Keys.PROJECT(data.slug),
    queryFn: async () => await getProject(+data.slug),
  });

  $: languages = $query.data?.languages.filter(Boolean).map((language) => language) ?? [];
</script>

<Container class="flex flex-col gap-2">
  <div class="flex justify-between gap-4">
    <a
      class="flex items-center gap-1.5 text-sm font-semibold py-1 px-2 rounded-full cursor-pointer transition-colors hover:bg-muted"
      href={Paths.home()}
    >
      <ArrowLeftIcon class="w-4 h-4" strokeWidth={3} />
      <span>Go back</span>
    </a>
    <!-- <Breadcrumbs /> -->
  </div>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between">
      {#if $query.isLoading}
        <div class="h-10 w-1/3 rounded bg-muted animate-pulse" />
      {:else if $query.data}
        <h2 class="text-4xl font-bold">{$query.data.name}</h2>
      {/if}
      <CreatePhraseButton />
    </div>
    {#if $query.isLoading}
      <PhrasesListSkeleton />
    {:else if $query.data}
      <PhrasesList phrases={$query.data.phrases} {languages} />
    {/if}
  </div>
</Container>
