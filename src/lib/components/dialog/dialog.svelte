<script lang="ts">
  import { X } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  import { IconButton } from '../icon-button';

  export let onClose: () => void;
</script>

<div role="presentation" class="fixed inset-0 bg-black/50" transition:fade={{ duration: 150 }} />
<div
  role="dialog"
  class="fixed inset-0 z-50 flex items-center justify-center"
  transition:fade={{ duration: 150 }}
>
  <div
    class="flex min-h-fit w-full min-w-[480px] max-w-lg flex-col gap-4 rounded bg-white px-8 py-6 shadow-lg"
    aria-modal="true"
  >
    <div class="flex w-full items-center justify-between">
      <h2 class="text-2xl font-semibold">
        <slot name="header" />
      </h2>
      <IconButton color="muted" Icon={X} on:click={onClose} />
    </div>
    <slot />
  </div>
</div>
