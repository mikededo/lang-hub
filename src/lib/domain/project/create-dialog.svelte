<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Dialog, Input } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';
  import { createProject } from '$lib/db';
  import type { Client, ProjectData } from '$lib/db';

  export let supabaseClient: Client;

  let name: ProjectData['name'];
  let website: NonNullable<ProjectData['website']>;

  $: searchParams = $page.url.searchParams;
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.createProject;
  const queryClient = useQueryClient();
  const mutation = createMutation({
    mutationFn: async () =>
      await createProject(supabaseClient, {
        name,
        website: website.trim() ? website.trim() : undefined,
      }),
  });

  const handleOnClose = (_?: MouseEvent, id?: number) => {
    const toProjectUrl = id ? `project/${id}` : '';
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    goto(`${$page.url.pathname}${toProjectUrl}?${params.toString()}`);

    name = '';
    website = '';
  };

  const handleOnCreate = () => {
    $mutation.mutate(undefined, {
      onSuccess: (project) => {
        if (!project) {
          return;
        }

        queryClient.invalidateQueries({ queryKey: Keys.PROJECTS });
        handleOnClose(undefined, project.id);
      },
    });
  };
</script>

{#if showDialog}
  <Dialog onClose={handleOnClose}>
    <span slot="header">Create a project</span>
    <Input label="Name" name="name" placeholder="Website i18n" bind:value={name} />
    <Input label="URL (optional)" name="website" placeholder="Website i18n" bind:value={website} />
    <div class="flex items-center justify-end gap-2">
      <Button disabled={!name} on:click={handleOnCreate}>Create</Button>
      <Button color="secondary" on:click={handleOnClose}>Cancel</Button>
    </div>
  </Dialog>
{/if}
