<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { ArrowLeftIcon } from 'lucide-svelte';

  import { Container } from '$lib/components';
  import { Keys, pathTo } from '$lib/config';
  import { getProject } from '$lib/db';
  import { CreatePhraseButton, PhrasesList, PhrasesListSkeleton } from '$lib/domain/phrases';
  import { PreviewTranslationsButton, PreviewTranslationsDialog } from '$lib/domain/translations';

  import type { PageData } from './$types';

  export let data: PageData;
  const { slug, supabaseClient } = data;

  let query = createQuery({
    queryKey: Keys.PROJECT(slug),
    queryFn: async () => await getProject(supabaseClient, +slug),
  });

  $: languages = $query.data?.languages.filter(Boolean).map((language) => language) ?? [];
</script>

<svelte:head>
  {#if $query.data}
    <title>Project: {$query.data.name}</title>
    <meta name="description" content="Phrases for the {$query.data.name} project" />
  {:else if $query.isError}
    <title>An error ocurred!</title>
    <meta name="description" content="An error ocurred!" />
  {:else}
    <title>Loading...</title>
    <meta name="description" content="Loading your project..." />
  {/if}
</svelte:head>

<Container class="flex flex-col gap-2">
  <div class="flex justify-between gap-4">
    <a
      class="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold transition-colors hover:bg-muted"
      href={pathTo('app')}
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
        <div class="flex items-center gap-2">
          <PreviewTranslationsButton />
          <CreatePhraseButton />
        </div>
      {/if}
    </div>
    {#if $query.isLoading}
      <PhrasesListSkeleton />
    {:else if $query.data}
      <PhrasesList phrases={$query.data.phrases} {languages} />
    {/if}
  </div>
</Container>
<PreviewTranslationsDialog project={+slug} />
