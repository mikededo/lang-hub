<script lang="ts">
  import { sineInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import type { PhraseTranslations } from '$lib/db';

  export let phrase: PhraseTranslations[number] | undefined = undefined;

  let isFocused = false;

  const onFocus = () => {
    isFocused = true;
  };
  const onBlur = () => {
    isFocused = false;
  };
</script>

<div
  class=":w flex h-full w-full flex-col gap-2 border-x border-b border-border p-3 transition-all first:rounded-t first:border last:rounded-b"
  class:z-10={isFocused}
  class:border-transparent={isFocused}
  class:ring-1={isFocused}
  class:ring-primary={isFocused}
>
  {#if phrase}
    <p class="text-xs font-semibold" transition:fly>{phrase.name}</p>
    <textarea
      rows="2"
      class="w-full flex-1 resize-none outline-none"
      placeholder="Start typing..."
      value={phrase.translated_text}
      on:focus={onFocus}
      on:blur={onBlur}
    />
    {#if isFocused}
      <div
        class="flex flex-row-reverse gap-2 self-end"
        transition:fly={{ y: 10, duration: 100, easing: sineInOut }}
      >
        <button
          class="cursor-pointer rounded-full bg-primary px-4 py-0.5 text-xs font-semibold text-primary-foreground hover:bg-primary/80"
        >
          Save
        </button>
      </div>
    {/if}
  {/if}
</div>
