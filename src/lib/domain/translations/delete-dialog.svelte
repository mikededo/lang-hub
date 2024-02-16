<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { DangerDialog } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';
  import { deleteProjectTranslation } from '$lib/db';
  import type { ProjectWithTranslations } from '$lib/db';
  import type { Tables } from '$lib/types';

  export let projectId: Tables<'translations'>['project_id'];

  const queryClient = useQueryClient();
  const mutation = createMutation({
    mutationFn: async (translationKey: string) =>
      await deleteProjectTranslation(projectId, translationKey),
  });

  $: searchParams = $page.url.searchParams;
  $: translationKey = searchParams.get(QUERY_PARAM_KEYS.translationKey);
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.delete &&
    translationKey &&
    projectId;

  const handleOnClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    params.delete(QUERY_PARAM_KEYS.translationKey);

    goto(`${$page.url.pathname}?${params.toString()}`);
  };

  const handleOnDelete = () => {
    if (!translationKey) {
      return;
    }

    $mutation.mutate(translationKey, {
      onSuccess: () => {
        const project = queryClient.getQueryData<ProjectWithTranslations>(
          Keys.PROJECT(`${projectId}`),
        );
        if (!project) {
          return;
        }

        const updated = { ...project };
        updated.translations = project.translations.filter(
          ({ translation_key }) => translation_key !== translationKey,
        );
        queryClient.setQueryData(Keys.PROJECT(`${projectId}`), updated);
        handleOnClose();
      },
    });
  };
</script>

{#if showDialog}
  <DangerDialog
    onCancel={handleOnClose}
    onConfirm={handleOnDelete}
    disableConfirm={!translationKey}
  >
    <p slot="description">
      Do you want to delete the <strong>{translationKey}</strong> key? This action is irreversible.
    </p>
  </DangerDialog>
{/if}
