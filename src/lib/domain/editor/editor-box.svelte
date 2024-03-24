<script lang="ts">
  import { sineInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import { clickAway } from '$lib/actions';
  import { LoadingButton } from '$lib/components';
  import type { PhraseTranslations } from '$lib/db';

  export let phrase: PhraseTranslations[number] | undefined = undefined;
  export let onSave: (phrase: PhraseTranslations[number], value: string) => void;
  export let loading: boolean = false;

  let isFocused = false;
  let value = phrase?.translated_text ?? '';

  const onFocus = () => {
    isFocused = true;
  };

  const onBlur = () => {
    isFocused = false;
  };

  const handleOnClick = () => {
    if (!phrase) {
      return;
    }
    onSave(phrase, value);
  };
</script>

<div
  class=":w flex h-full w-full flex-col gap-2 border-x border-b border-border p-3 transition-all first:rounded-t first:border last:rounded-b"
  class:z-10={isFocused}
  class:border-transparent={isFocused}
  class:ring-1={isFocused}
  class:ring-primary={isFocused}
  use:clickAway={onBlur}
>
  {#if phrase}
    <p class="text-xs font-semibold" transition:fly>{phrase.language_name}</p>
    <textarea
      rows="2"
      class="w-full flex-1 resize-none outline-none"
      placeholder="Start typing..."
      bind:value
      on:focus={onFocus}
    />
    {#if isFocused}
      <div
        class="flex flex-row-reverse gap-2 self-end"
        transition:fly={{ y: 10, duration: 100, easing: sineInOut }}
      >
        <LoadingButton
          class="z-20 cursor-pointer px-3 py-0.5 text-xs"
          {loading}
          loadingSize="small"
          disabled={value === phrase.translated_text}
          on:click={handleOnClick}
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    {/if}
  {/if}
</div>
