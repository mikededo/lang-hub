<script lang="ts">
  import type { PhraseTranslations } from '$lib/db';

  export let translations: PhraseTranslations;
</script>

<ol class="flex flex-col gap-[1px] p-2">
  {#each translations as { id, translated_text: text, name: languageName } (id)}
    <li class="flex cursor-pointer flex-col gap-1 rounded p-2 hover:bg-muted">
      <div class="flex justify-between">
        <span class="text-sm font-semibold">{languageName}</span>
        <!-- TODO: Extract into component - Chip -->
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
    </li>
  {/each}
</ol>
