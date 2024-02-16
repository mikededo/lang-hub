<script lang="ts">
  import { X } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  import { IconButton } from '../icon-button';

  export let onClose: (() => void) | undefined = undefined;
</script>

<div role="presentation" class="fixed bg-black/50 inset-0" transition:fade={{ duration: 150 }} />
<div
  role="dialog"
  class="fixed inset-0 z-50 flex items-center justify-center"
  transition:fade={{ duration: 150 }}
>
  <div
    class="max-w-lg min-w-[480px] min-h-fit rounded bg-white px-8 py-6 shadow-lg flex flex-col gap-4 w-full"
  >
    <div class="flex justify-between items-center w-full">
      <h2 class="text-2xl font-semibold">
        <slot name="header" />
      </h2>
      <IconButton color="muted" Icon={X} on:click={onClose} />
    </div>
    <slot />
  </div>
</div>
