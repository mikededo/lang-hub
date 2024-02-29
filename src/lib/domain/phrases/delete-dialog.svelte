<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { DangerDialog } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';
  import { deleteProjectTranslation } from '$lib/db';
  import type { Client, ProjectWithPhrases } from '$lib/db';
  import type { Tables } from '$lib/types';

  export let projectId: Tables<'phrases'>['project'];
  export let supabaseClient: Client;

  const queryClient = useQueryClient();
  const mutation = createMutation({
    mutationFn: async (key: string) => await deleteProjectTranslation(supabaseClient, key),
  });

  $: searchParams = $page.url.searchParams;
  $: phraseKey = searchParams.get(QUERY_PARAM_KEYS.translationKey);
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.deletePhrase &&
    phraseKey &&
    projectId;

  const handleOnClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    params.delete(QUERY_PARAM_KEYS.translationKey);

    goto(`${$page.url.pathname}?${params.toString()}`);
  };

  const handleOnDelete = () => {
    if (!phraseKey) {
      return;
    }

    $mutation.mutate(phraseKey, {
      onSuccess: () => {
        const project = queryClient.getQueryData<ProjectWithPhrases>(Keys.PROJECT(`${projectId}`));
        if (!project) {
          return;
        }

        const updated = { ...project };
        updated.phrases = project.phrases.filter(({ key }) => key !== phraseKey);
        queryClient.setQueryData(Keys.PROJECT(`${projectId}`), updated);
        handleOnClose();
      },
    });
  };
</script>

{#if showDialog}
  <DangerDialog onCancel={handleOnClose} onConfirm={handleOnDelete} disableConfirm={!phraseKey}>
    <p slot="description">
      Do you want to delete the <strong>{phraseKey}</strong> key? This action is irreversible.
    </p>
  </DangerDialog>
{/if}
