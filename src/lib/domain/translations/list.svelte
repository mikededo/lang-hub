<script lang="ts">
  import EmptyTranslations from './empty.svelte';
  import TranslationItem from './item.svelte';

  import type { ProjectWithTranslations } from '$lib/db';

  export let locales: ProjectWithTranslations['locales'];
  export let translations: ProjectWithTranslations['translations'];
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-xl font-semibold">Translations</h3>
  {#if translations.length}
    <ol role="list" class="flex flex-col gap-2">
      {#each translations as { translation_key: key, total_translated } (key)}
        {#if key}
          <TranslationItem translation={key} translated={total_translated} {locales} />
        {/if}
      {/each}
    </ol>
  {:else}
    <EmptyTranslations />
  {/if}
</div>
