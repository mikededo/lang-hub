<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { ArrowLeftIcon } from 'lucide-svelte';

  import type { PageData } from './$types';

  import { Container } from '$lib/components';
  import { Keys, Paths } from '$lib/config';
  import { getProject } from '$lib/db';
  import { CreatePhraseButton, PhrasesList, PhrasesListSkeleton } from '$lib/domain/phrases';

  export let data: PageData;
  const { slug, supabaseClient } = data;

  let query = createQuery({
    queryKey: Keys.PROJECT(slug),
    queryFn: async () => await getProject(supabaseClient, +slug),
  });

  $: languages = $query.data?.languages.filter(Boolean).map((language) => language) ?? [];
</script>

<Container class="flex flex-col gap-2">
  <div class="flex justify-between gap-4">
    <a
      class="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold transition-colors hover:bg-muted"
      href={Paths.home()}
    >
      <ArrowLeftIcon class="h-4 w-4" strokeWidth={3} />
      <span>Go back</span>
    </a>
    <!-- <Breadcrumbs /> -->
  </div>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between">
      {#if $query.isLoading}
        <div class="h-10 w-1/3 animate-pulse rounded bg-muted" />
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
