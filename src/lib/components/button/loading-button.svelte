<script lang="ts">
  import { Loader2 } from 'lucide-svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { slide } from 'svelte/transition';

  import Button from './button.svelte';

  type $$Props = HTMLButtonAttributes & {
    loading?: boolean;
  };

  let { loading, ...props } = $$props;
</script>

<Button {...props}>
  <span class="flex items-center justify-center">
    {#if loading}
      <span transition:slide={{ axis: 'x' }} class="mr-2">
        <Loader2 class="animate-spin" />
      </span>
    {/if}
    <slot />
  </span>
</Button>
