<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import type { PageData } from './$types';

  import { page } from '$app/stores';
  import { Keys, QUERY_PARAM_KEYS } from '$lib/config';
  import { getProjectPhrasesAndTranslations } from '$lib/db';
  import { Header, PhrasesList } from '$lib/domain/editor';

  export let data: PageData;
  const query = createQuery({
    queryKey: Keys.PROJECT_PHRASES(data.projectId),
    queryFn: async () => await getProjectPhrasesAndTranslations(+data.projectId),
  });
  $: selectedKey = $page.url.searchParams.get(QUERY_PARAM_KEYS.editorSelectedKey);
</script>

<div class="flex flex-col">
  <Header projectId={data.projectId} />
  <div class="min-h-editor w-full flex">
    <PhrasesList phrases={$query.data?.data ?? []} />
    <section class="w-full flex p-4">
      {#if !selectedKey}
        <div class="w-full bg-muted/50 rounded h-full flex items-center justify-center">
          <p>Select a translation to start editing!</p>
        </div>
      {/if}
    </section>
    <aside class="w-editor-aside border-l border-border shrink-0"></aside>
  </div>
</div>
