<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { Copy } from 'lucide-svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Dialog, JsonPreview, TextIconButton } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES, pathTo } from '$lib/config';
  import { getSupabaseClient } from '$lib/context';
  import { getLanguageJSONToExport } from '$lib/db';

  export let project: number;

  const supabaseClient = getSupabaseClient();

  $: searchParams = $page.url.searchParams;
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.previewTranslations;

  $: exportQuery = createQuery({
    queryKey: Keys.PREVIEW_TRANSLATIONS(project, 1),
    queryFn: async () => getLanguageJSONToExport(supabaseClient, { project, language: 1 }),
    enabled: showDialog,
  });

  const handleOnClose = (_?: MouseEvent, id?: number) => {
    const pathname = id ? pathTo('project', { project: `${id}` }) : $page.url.pathname;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    goto(`${pathname}?${params.toString()}`);
  };
</script>

{#if showDialog}
  <Dialog dialogClasses="max-w-[50%]" onClose={handleOnClose}>
    <span slot="header">Translations</span>
    {#if $exportQuery.isLoading}
      <div class="h-48 w-full animate-pulse rounded-md bg-muted" />
    {:else if $exportQuery.data}
      <div class="w-full rounded-md bg-muted px-2 py-2 font-mono text-xs font-medium">
        <JsonPreview jsonObject={$exportQuery.data} />
      </div>
    {/if}
    <div slot="footer" class="flex items-center justify-end gap-2">
      <Button color="secondary" on:click={handleOnClose}>Close</Button>
      <TextIconButton Icon={Copy} color="primary" on:click={console.log} disabled>
        Copy
      </TextIconButton>
    </div>
  </Dialog>
{/if}
