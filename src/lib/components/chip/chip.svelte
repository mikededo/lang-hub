<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type $$Props = HTMLButtonAttributes;
</script>

<button
  class="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-2 py-1 text-xs text-white transition-colors hover:bg-primary/75 dark:bg-primary-800 dark:hover:bg-primary-900/90"
  on:click
>
  <slot />
</button>
