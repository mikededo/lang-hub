<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import { page } from '$app/stores';
  import { EditorCollapsible } from '$lib/components/collapsible';
  import { Keys, QUERY_PARAM_KEYS } from '$lib/config';
  import type { PhraseTranslations } from '$lib/db';
  import { getPhraseTranslations, getProject } from '$lib/db';
  import {
    Editors,
    Header,
    PhraseTranslationsList,
    PhraseTranslationsSkeleton,
    PhrasesList,
  } from '$lib/domain/editor';
  import type { Tables } from '$lib/types';

  import type { PageData } from './$types';

  export let data: PageData;
  const { projectId, supabaseClient, queryClient } = data;

  $: projectQuery = createQuery({
    queryKey: Keys.PROJECT(projectId),
    queryFn: async () => await getProject(supabaseClient, +projectId),
  });
  $: selectedKey = $page.url.searchParams.get(QUERY_PARAM_KEYS.editorSelectedKey);
  $: phraseQuery = createQuery({
    queryKey: Keys.PROJECT_PHRASE(projectId, selectedKey!),
    queryFn: async () => {
      if (selectedKey) {
        return await getPhraseTranslations(supabaseClient, selectedKey);
      }
    },
    enabled: !!selectedKey,
  });

  const handleOnPhraseUpdated = ({ id, translated_text }: Required<Tables<'translations'>>) => {
    queryClient.setQueryData<PhraseTranslations>(
      Keys.PROJECT_PHRASE(projectId, selectedKey!),
      (translations) => {
        if (!translations) {
          return;
        }

        return translations.map((translation) =>
          translation.id === id ? { ...translation, translated_text } : translation,
        );
      },
    );
  };
</script>

<svelte:head>
  {#if $projectQuery.data}
    <title>Editor · {$projectQuery.data.name} | Lang Hub</title>
    <meta name="description" content="Start editing your keys with ease!" />
    <meta property="og:title" content="Editor · {$projectQuery.data.name} | Lang Hub" />
    <meta property="og:description" content="Start editing your keys with ease!" />
  {:else if $projectQuery.isError}
    <title>An error ocurred!</title>
    <meta name="description" content="An error ocurred!" />
  {:else}
    <title>Loading...</title>
    <meta name="description" content="Loading your project..." />
  {/if}
  <meta name="theme-color" content="#ffffff" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="apple-mobile-web-app-title" content="Lang Hub" />
  <meta name="application-name" content="Lang Hub" />
</svelte:head>

<div class="flex flex-col">
  <Header {projectId} />
  <div class="flex h-editor w-full">
    <PhrasesList phrases={$projectQuery.data?.phrases ?? []} />
    <section class="flex w-full flex-col gap-4 p-4">
      {#if !selectedKey || !$phraseQuery.data}
        <div class="flex h-full w-full items-center justify-center rounded bg-muted/50">
          <p>Select a translation to start editing!</p>
        </div>
      {:else}
        <Editors phrases={$phraseQuery.data} onPhraseUpdated={handleOnPhraseUpdated} />
      {/if}
    </section>
    <aside class="w-editor-aside shrink-0 border-l border-border">
      <EditorCollapsible title="Languages">
        {#if $phraseQuery.isLoading}
          <PhraseTranslationsSkeleton />
        {:else if $phraseQuery.data}
          <PhraseTranslationsList translations={$phraseQuery.data} />
        {/if}
      </EditorCollapsible>
    </aside>
  </div>
</div>
