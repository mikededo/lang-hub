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
  <button class="flex w-full gap-2 items-center px-3 py-2 border-b" on:click={handleOnClick}>
    <ChevronDown class="w-4 h-4 transition-transform {collapsed ? '-rotate-90' : ''}" />
    <p class="text-semibold">{title}</p>
  </button>
  {#if !collapsed}
    <div transition:slide={{ duration: 150 }}>
      <slot />
    </div>
  {/if}
</div>
