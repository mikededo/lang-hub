<script lang="ts">
  import { CheckCircle2, Circle } from 'lucide-svelte';
  import { scale } from 'svelte/transition';

  export let checked: boolean;
</script>

{#if checked}
  <div in:scale={{ duration: 100 }}>
    <CheckCircle2 class="mt-0.5 size-4 text-primary" />
  </div>
{:else}
  <div in:scale={{ duration: 100 }}>
    <Circle class="mt-0.5 size-4" />
  </div>
{/if}
