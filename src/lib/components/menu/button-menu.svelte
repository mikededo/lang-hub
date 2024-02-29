<script lang="ts">
  import { createDropdownMenu, melt } from '@melt-ui/svelte';
  import { Settings2 } from 'lucide-svelte';
  import { setContext } from 'svelte';
  import { fly } from 'svelte/transition';

  import { IconButton } from '../icon-button';

  export let Icon = Settings2;

  const {
    elements: { trigger, menu, item },
    states: { open },
  } = createDropdownMenu({
    forceVisible: true,
    loop: true,
    positioning: { placement: 'top-end' },
  });
  setContext('melt:item', item);
</script>

<IconButton {Icon} class={$open ? 'border bg-muted' : ''} color="muted" meltElement={trigger} />
{#if $open}
  <div
    class="flex min-w-[240px] flex-col items-start rounded border bg-white text-sm shadow-lg"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -10 }}
  >
    <slot />
  </div>
{/if}
