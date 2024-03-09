<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';


  import { page } from '$app/stores';
  import { EditorCollapsible } from '$lib/components/collapsible';
  import { Keys, QUERY_PARAM_KEYS } from '$lib/config';
  import { getPhraseTranslations, getProject } from '$lib/db';
  import {
    Header,
    PhraseTranslationsList,
    PhraseTranslationsSkeleton,
    PhrasesList,
  } from '$lib/domain/editor';

  import type { PageData } from './$types';

  export let data: PageData;
  const { projectId, supabaseClient } = data;
  let projectQuery = createQuery({
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
</script>

<div class="flex flex-col">
  <Header {projectId} />
  <div class="flex min-h-editor w-full">
    <PhrasesList phrases={$projectQuery.data?.phrases ?? []} />
    <section class="flex w-full p-4">
      {#if !selectedKey}
        <div class="flex h-full w-full items-center justify-center rounded bg-muted/50">
          <p>Select a translation to start editing!</p>
        </div>
      {:else}
        <div class="flex h-full w-full items-center justify-center rounded border border-border" />
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
