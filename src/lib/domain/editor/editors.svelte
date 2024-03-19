<script lang="ts">
  import type { PhraseTranslations } from '$lib/db';

  import EditorBox from './editor-box.svelte';
  import { selectedLanguages } from './helpers';

  export let phrases: PhraseTranslations;

  const getPhraseFromId = (id: string) => phrases.find((phrase) => phrase.id === +id);
</script>

{#each $selectedLanguages as id (id)}
  {#if getPhraseFromId(id)}
    <EditorBox phrase={getPhraseFromId(id)} />
  {/if}
{/each}
