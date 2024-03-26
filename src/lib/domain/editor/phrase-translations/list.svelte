<script lang="ts">
  import { CheckedIcon } from '$lib/components';
  import type { PhraseTranslations } from '$lib/db';

  import { onToggleLanguage, selectedLanguages } from '../helpers';

  export let translations: PhraseTranslations;
</script>

<div class="flex flex-col gap-0.5 p-2">
  {#each translations as { translated_text: text, language_name, language_id } (language_id)}
    <button
      class="flex cursor-pointer gap-2 rounded p-2 text-left hover:bg-muted"
      class:bg-muted={$selectedLanguages.includes(`${language_id}`)}
      on:click={onToggleLanguage(language_id)}
    >
      <CheckedIcon checked={$selectedLanguages.includes(`${language_id}`)} />
      <div class="flex w-full flex-col items-start gap-1">
        <div class="flex w-full items-center justify-between gap-1">
          <span class="line-clamp-1 text-sm font-semibold">
            {language_name}
          </span>
          {#if text}
            <p
              class="flex items-center rounded-full bg-primary px-2 py-[1px] text-[10px] text-white"
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
          <span class="line-clamp-3 w-full text-xs italic text-foreground/80">{text}</span>
        {/if}
      </div>
    </button>
  {/each}
</div>
