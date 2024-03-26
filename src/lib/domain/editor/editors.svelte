<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';
  import { X } from 'lucide-svelte';

  import { Banner, IconButton } from '$lib/components';
  import { getSupabaseClient } from '$lib/context';
  import { type PhraseTranslations, type UpsertTranslationData, upsertTranslation } from '$lib/db';
  import type { OptProp, Tables } from '$lib/types';

  import EditorBox from './editor-box.svelte';
  import { selectedLanguages } from './helpers';

  export let phrases: PhraseTranslations;
  export let onPhraseUpdated: OptProp<(translation: Tables<'translations'>) => void> = undefined;

  let supabaseClient = getSupabaseClient();
  let mutation = createMutation({
    mutationFn: (translation: UpsertTranslationData) =>
      upsertTranslation(supabaseClient, translation),
  });
  let error: string | undefined = undefined;

  const getPhraseFromLanguageId = (id: string) =>
    phrases.find((phrase) => phrase.language_id === +id);

  const handleOnSavePhrase = (phrase: PhraseTranslations[number], value: string) => {
    if (!phrase.language_id || !phrase.phrase_id) {
      return;
    }

    const translation: UpsertTranslationData = {
      id: phrase.id ?? undefined,
      language_id: phrase.language_id,
      phrase_key: phrase.phrase_id,
      translated_text: value,
    };
    $mutation.mutate(translation, {
      onSuccess: (translations) => {
        if (translations && translations.length === 1) {
          onPhraseUpdated?.(translations[0]);
        }
      },
      onError: () => {
        error = 'There has been an error saving the locale. Try again!';
      },
    });
  };

  const handleOnClearError = () => {
    error = undefined;
  };
</script>

{#if error}
  <Banner destructive withTransition>
    <div class="flex w-full items-center">
      <span class="flex-1 text-center">{error}</span>
      <IconButton Icon={X} size="small" color="destructive" on:click={handleOnClearError} />
    </div>
  </Banner>
{/if}
<div class="flex h-full w-full flex-col">
  {#each $selectedLanguages as id (id)}
    {#if getPhraseFromLanguageId(id)}
      <EditorBox
        phrase={getPhraseFromLanguageId(id)}
        onSave={handleOnSavePhrase}
        loading={$mutation.isPending}
      />
    {/if}
  {/each}
</div>
