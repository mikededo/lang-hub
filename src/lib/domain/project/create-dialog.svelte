<script lang="ts">
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';


  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import {
    Button,
    Dialog,
    EmptyComboboxOption,
    Input,
    MultipleCombobox,
    SingleCombobox,
  } from '$lib/components';
  import { Keys, QUERY_PARAM_KEYS, QUERY_PARAM_VALUES, pathTo } from '$lib/config';
  import { createProject } from '$lib/db';
  import type { Client } from '$lib/db';
  import type { FunctionArgs, Tables } from '$lib/types';

  import { LanguageComboboxOption } from '../languages';

  export let supabaseClient: Client;
  export let loading: boolean = false;
  export let languages: Tables<'languages'>[] | null | undefined = [];

  let name: string;
  let website: string;
  let selectedLanguages: Tables<'languages'>[] = [];
  let defaultLanguage: Tables<'languages'>['id'] | undefined;

  $: searchParams = $page.url.searchParams;
  $: showDialog =
    searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.createProject;

  const queryClient = useQueryClient();
  const mutation = createMutation({
    mutationFn: async (args: FunctionArgs<'create_project'>) =>
      await createProject(supabaseClient, args),
  });

  const handleOnClose = (_?: MouseEvent, id?: number) => {
    const pathname = id ? pathTo('project', { project: `${id}` }) : $page.url.pathname;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    goto(`${pathname}?${params.toString()}`);

    name = '';
    website = '';
  };

  const handleOnCreate = () => {
    if (!name || selectedLanguages.length === 0 || !defaultLanguage) {
      // TODO: Display error
      return;
    }

    $mutation.mutate(
      {
        name,
        website,
        language_ids: selectedLanguages.map(({ id }) => id),
        default_language_id: defaultLanguage,
      },
      {
        onSuccess: (project) => {
          if (!project) {
            return;
          }

          queryClient.invalidateQueries({ queryKey: Keys.PROJECTS });
          handleOnClose(undefined, project.id);
        },
      },
    );
  };

  const handleOnChangeSelected = ({ next }: { next?: { value: number }[] }) => {
    selectedLanguages = (next ?? []).reduce<Tables<'languages'>[]>((acc, { value }) => {
      const lang = languages?.find(({ id }) => id === value);
      return lang ? [...acc, lang] : acc;
    }, []);
  };

  const handleOnChangeDefaultLanguage = ({ next }: { next?: { value: number } }) => {
    if (next?.value) {
      defaultLanguage = next.value;
    }
  };
</script>

{#if showDialog}
  <Dialog onClose={handleOnClose}>
    <span slot="header">Create a project</span>
    <form class="flex w-full flex-col gap-4" on:submit|preventDefault={handleOnCreate}>
      <Input label="Name" name="name" placeholder="Website i18n" bind:value={name} />
      <Input
        label="URL (optional)"
        name="website"
        placeholder="Website i18n"
        bind:value={website}
      />
      <MultipleCombobox
        label="Project languages"
        name="projectLanguages"
        placeholder="Select the project languages"
        onChangeSelected={handleOnChangeSelected}
        disabled={loading}
      >
        {#if languages?.length}
          {#each languages as language (language.id)}
            <LanguageComboboxOption {language} />
          {/each}
        {:else}
          <EmptyComboboxOption>No results</EmptyComboboxOption>
        {/if}
      </MultipleCombobox>
      <SingleCombobox
        label="Default language"
        name="defaultLanguage"
        placeholder="Select the default language"
        onChangeSelected={handleOnChangeDefaultLanguage}
        disabled={selectedLanguages.length === 0}
      >
        {#if selectedLanguages.length}
          {#each selectedLanguages as language (language.id)}
            <LanguageComboboxOption {language} />
          {/each}
        {:else}
          <EmptyComboboxOption>No results</EmptyComboboxOption>
        {/if}
      </SingleCombobox>
      <div class="flex items-center justify-end gap-2">
        <Button type="submit" disabled={!name}>Create</Button>
        <Button color="secondary" on:click={handleOnClose}>Cancel</Button>
      </div>
    </form>
  </Dialog>
{/if}
