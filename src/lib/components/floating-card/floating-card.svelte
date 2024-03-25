<script lang="ts">
  import type { AnyMeltElement } from '@melt-ui/svelte';
  import { emptyMeltElement, melt } from '@melt-ui/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { fly } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    meltElement?: AnyMeltElement;
    clientWidth?: number;
  };

  export let meltElement: $$Props['meltElement'] = undefined;

  $: classes = twMerge(
    'border-border flex min-w-[240px] flex-col items-start rounded border bg-background text-sm shadow-lg',
    $$restProps.class,
  );

  $: element = meltElement ?? emptyMeltElement;
</script>

<div
  {...$$restProps}
  class={classes}
  use:melt={$element}
  transition:fly={{ duration: 150, y: -10 }}
>
  <slot />
</div>
