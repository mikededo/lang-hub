<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { ArrowLeftIcon, FilePlus2 } from 'lucide-svelte';

  import type { PageData } from './$types';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { TextIconButton } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';
  import { getProject } from '$lib/db';
  import {
    CreateTranslationDialog,
    DeleteTranslationDialog,
    TranslationsList,
    TranslationsListSkeleton,
  } from '$lib/domain/translations';
  import type { Tables } from '$lib/types';

  export let data: PageData;

  const query = createQuery({
    queryKey: Keys.PROJECT(data.slug),
    queryFn: async () => await getProject(+data.slug),
  });

  $: projectId = $query.data?.id ?? 0;
  $: locales =
    $query.data?.locales.filter(Boolean).map(({ locale }) => locale as Tables<'locales'>) ?? [];

  const handleOnCreate = () => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.set(QUERY_PARAM_KEYS.dialog, QUERY_PARAM_VALUES.dialog.create);
    goto(`${$page.url.pathname}?${params.toString()}`);
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex justify-between gap-4">
    <a
      class="flex items-center gap-1.5 text-sm font-semibold py-1 px-2 rounded-full cursor-pointer transition-colors hover:bg-muted"
      href="/"
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
      <TextIconButton Icon={FilePlus2} on:click={handleOnCreate}>Add translation</TextIconButton>
    </div>
    {#if $query.isLoading}
      <TranslationsListSkeleton />
    {:else if $query.data}
      <TranslationsList translations={$query.data.translations} locales={$query.data.locales} />
    {/if}
  </div>
</div>

<CreateTranslationDialog {projectId} {locales} />
<DeleteTranslationDialog {projectId} />
