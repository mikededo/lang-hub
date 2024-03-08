<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type $$Props = HTMLButtonAttributes;
</script>

<button
  class="items-centera flex cursor-pointer gap-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary/75"
  on:click
>
  <slot />
</button>
