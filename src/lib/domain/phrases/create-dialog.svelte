<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Dialog, Input } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';
  import { createProjectPhrase } from '$lib/db';
  import type { Client } from '$lib/db';
  import type { Tables } from '$lib/types';

  export let projectId: Tables<'projects'>['id'];
  export let supabaseClient: Client;

  let key: string;

  $: searchParams = $page.url.searchParams;
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.createPhrase &&
    projectId;

  const queryClient = useQueryClient();
  const mutation = createMutation({
    mutationFn: async () => await createProjectPhrase(supabaseClient, projectId, key),
  });

  const handleOnClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    goto(`${$page.url.pathname}?${params.toString()}`);

    key = '';
  };

  const handleOnCreate = () => {
    // TODO: Add create another one
    // TODO: If not create another one, redirect to editor
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
    <Input label="Key" name="key" placeholder="Unique phrase key..." bind:value={key} />
    <div class="flex items-center justify-end gap-2">
      <Button disabled={!key} on:click={handleOnCreate}>Create</Button>
      <Button color="secondary" on:click={handleOnClose}>Cancel</Button>
    </div>
  </Dialog>
{/if}
