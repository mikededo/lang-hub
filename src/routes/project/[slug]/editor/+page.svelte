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
  <div class="min-h-editor w-full flex">
    <PhrasesList phrases={$phrasesQuery.data ?? []} />
    <section class="w-full flex p-4">
      {#if !selectedKey}
        <div class="w-full bg-muted/50 rounded h-full flex items-center justify-center">
          <p>Select a translation to start editing!</p>
        </div>
      {:else}
        <div class="w-full border rounded h-full flex items-center justify-center"></div>
      {/if}
    </section>
    <aside class="w-editor-aside border-l border-border shrink-0">
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
