<script lang="ts">
  import type { ProjectWithPhrases } from '$lib/db';

  import EmptyPhrases from './empty.svelte';
  import PhraseItem from './item.svelte';

  export let languages: ProjectWithPhrases['languages'];
  export let phrases: ProjectWithPhrases['phrases'];
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-xl font-semibold">Phrases</h3>
  {#if phrases.length}
    <ol role="list" class="flex flex-col gap-2">
      {#each phrases as { key, translated_count: count } (key)}
        {#if key}
          <PhraseItem phrase={key} translated={count} {languages} />
        {/if}
      {/each}
    </ol>
  {:else}
    <EmptyPhrases />
  {/if}
</div>
