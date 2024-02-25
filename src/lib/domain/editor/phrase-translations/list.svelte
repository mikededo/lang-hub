<script lang="ts">
  import type { PhraseTranslations } from '$lib/db';

  export let translations: PhraseTranslations;
</script>

<ol class="p-2 flex flex-col gap-[1px]">
  {#each translations as { id, translated_text: text, name: languageName } (id)}
    <li class="p-2 rounded hover:bg-muted flex flex-col gap-1 cursor-pointer">
      <div class="flex justify-between">
        <span class="text-sm font-semibold">{languageName}</span>
        <!-- TODO: Extract into component - Chip -->
        {#if text}
          <p
            class="text-[10px] flex items-center px-2 py-[1px] bg-primary text-primary-foreground rounded-full"
          >
            Translated
          </p>
        {:else}
          <p
            class="text-[10px] flex items-center px-2 py-[1px] bg-muted text-muted-foreground rounded-full"
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
