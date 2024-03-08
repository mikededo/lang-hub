<script lang="ts">
  import { createDropdownMenu } from '@melt-ui/svelte';
  import { Settings2 } from 'lucide-svelte';
  import { setContext } from 'svelte';

  import { FloatingCard } from '../floating-card';
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
  <FloatingCard meltElement={menu}>
    <slot />
  </FloatingCard>
{/if}
