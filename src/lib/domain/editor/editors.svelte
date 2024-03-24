<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';

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
    });
  };
</script>

{#each $selectedLanguages as id (id)}
  {#if getPhraseFromLanguageId(id)}
    <EditorBox
      phrase={getPhraseFromLanguageId(id)}
      onSave={handleOnSavePhrase}
      loading={$mutation.isPending}
    />
  {/if}
{/each}
