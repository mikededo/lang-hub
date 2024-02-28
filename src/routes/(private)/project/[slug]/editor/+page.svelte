<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import type { PageData } from './$types';

  import { page } from '$app/stores';
  import { EditorCollapsible } from '$lib/components/collapsible';
  import { Keys, QUERY_PARAM_KEYS } from '$lib/config';
  import { getPhraseTranslations, getProjectPhrasesAndTranslations } from '$lib/db';
  import {
    Header,
    PhraseTranslationsList,
    PhraseTranslationsSkeleton,
    PhrasesList,
  } from '$lib/domain/editor';

  export let data: PageData;
  const phrasesQuery = createQuery({
    queryKey: Keys.PROJECT_PHRASES(data.projectId),
    queryFn: async () => await getProjectPhrasesAndTranslations(+data.projectId),
  });

  $: selectedKey = $page.url.searchParams.get(QUERY_PARAM_KEYS.editorSelectedKey);
  $: phraseQuery = createQuery({
    queryKey: Keys.PROJECT_PHRASE(data.projectId, selectedKey!),
    queryFn: async () => {
      if (selectedKey) {
        return await getPhraseTranslations(selectedKey);
      }
    },
    enabled: !!selectedKey,
  });
</script>

<div class="flex flex-col">
  <Header projectId={data.projectId} />
  <div class="flex min-h-editor w-full">
    <PhrasesList phrases={$phrasesQuery.data ?? []} />
    <section class="flex w-full p-4">
      {#if !selectedKey}
        <div class="flex h-full w-full items-center justify-center rounded bg-muted/50">
          <p>Select a translation to start editing!</p>
        </div>
      {:else}
        <div class="flex h-full w-full items-center justify-center rounded border"></div>
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
