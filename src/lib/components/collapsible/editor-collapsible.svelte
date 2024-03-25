<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let title: string;
  export let initiallyCollapsed: boolean = false;

  let collapsed = initiallyCollapsed;

  const handleOnClick = () => {
    collapsed = !collapsed;
  };
</script>

<div class="h-10 bg-muted">
  <button
    class="border-border flex w-full items-center gap-2 border-b px-3 py-2"
    on:click={handleOnClick}
  >
    <ChevronDown class="h-4 w-4 transition-transform {collapsed ? '-rotate-90' : ''}" />
    <p class="text-semibold">{title}</p>
  </button>
  {#if !collapsed}
    <div transition:slide={{ duration: 150 }}>
      <slot />
    </div>
  {/if}
</div>
