<script lang="ts">
  import { CheckedIcon } from '$lib/components';
  import type { PhraseTranslations } from '$lib/db';

  import { onToggleLanguage, selectedLanguages } from '../helpers';

  export let translations: PhraseTranslations;
</script>

<div class="flex flex-col gap-0.5 p-2">
  {#each translations as { id, translated_text: text, name: languageName } (id)}
    <button
      class="flex cursor-pointer gap-2 rounded p-2 text-left hover:bg-muted"
      class:bg-gray-100={$selectedLanguages.includes(`${id}`)}
      on:click={onToggleLanguage(id)}
    >
      <CheckedIcon checked={$selectedLanguages.includes(`${id}`)} />
      <div class="flex w-full flex-col items-start gap-1">
        <div class="flex w-full items-center justify-between gap-1">
          <span class="line-clamp-1 text-sm font-semibold">
            {languageName}
          </span>
          {#if text}
            <p
              class="flex items-center rounded-full bg-primary px-2 py-[1px] text-[10px] text-primary-foreground"
            >
              Translated
            </p>
          {:else}
            <p
              class="flex items-center rounded-full bg-muted px-2 py-[1px] text-[10px] text-muted-foreground"
            >
              Untranslated
            </p>
          {/if}
        </div>
        {#if text}
          <span class="line-clamp-3 text-xs italic text-foreground/80">{text}</span>
        {/if}
      </div>
    </button>
  {/each}
</div>
