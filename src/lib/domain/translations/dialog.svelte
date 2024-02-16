<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Dialog } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';
  import { createProjectTranslation } from '$lib/db';
  import type { Tables } from '$lib/types';

  export let projectId: Tables<'translations'>['project_id'];
  export let locales: Tables<'locales'>[];

  let translationKey: string;

  $: searchParams = $page.url.searchParams;
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.translation &&
    projectId;

  const queryClient = useQueryClient();
  const mutation = createMutation({
    mutationFn: async () => await createProjectTranslation(projectId, locales, translationKey),
  });

  const handleOnClose = () => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    goto(`${$page.url.pathname}?${params.toString()}`);

    translationKey = '';
  };

  const handleOnCreate = () => {
    $mutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: Keys.PROJECT(`${projectId}`) });

        handleOnClose();
      },
    });
  };
</script>

{#if showDialog}
  <Dialog onClose={handleOnClose}>
    <span slot="header">Create a translation</span>
    <div class="flex flex-col gap-1">
      <label for="key" class="text-xs font-semibold uppercase">Key</label>
      <input
        name="key"
        placeholder="Unique locale key..."
        bind:value={translationKey}
        class="h-10 ring ring-transparent border transition-all focus:ring-offset-white focus:ring-offset-2 focus:ring-primary rounded px-3 py-1 outline-none"
      />
    </div>

    <div class="flex items-center justify-end gap-2">
      <Button disabled={!translationKey} on:click={handleOnCreate}>Create</Button>
      <Button color="secondary" on:click={handleOnClose}>Cancel</Button>
    </div>
  </Dialog>
{/if}
