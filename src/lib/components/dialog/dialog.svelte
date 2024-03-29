<script lang="ts">
  import { X } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  import { IconButton } from '../icon-button';

  export let onClose: () => void;
  export let dialogClasses: string = '';

  $: classes = twMerge(
    'flex max-h-[80%] min-h-fit w-full min-w-[480px] max-w-lg flex-col overflow-hidden rounded border border-border bg-background shadow-lg transition-all',
    dialogClasses,
  );
</script>

<div role="presentation" class="fixed inset-0 bg-black/50" transition:fade={{ duration: 150 }} />
<div
  role="dialog"
  class="fixed inset-0 z-50 flex items-center justify-center"
  transition:fade={{ duration: 150 }}
>
  <div class={classes} aria-modal="true">
    <div class="flex w-full items-center justify-between p-4">
      <h2 class="text-2xl font-semibold">
        <slot name="header" />
      </h2>
      <IconButton color="muted" Icon={X} on:click={onClose} />
    </div>
    <div class="relative flex flex-1 flex-col gap-4 overflow-y-auto px-4">
      <slot />
    </div>
    <div class="p-4">
      <slot name="footer" />
    </div>
  </div>
</div>
