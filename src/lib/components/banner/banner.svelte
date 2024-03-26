<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { slide } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    destructive?: boolean;
    withTransition?: boolean;
  };

  export let destructive: $$Props['destructive'] = false;
  export let withTransition: $$Props['withTransition'] = false;

  $: classes = twMerge(
    'w-full rounded-lg bg-muted p-2 text-center text-sm',
    destructive && 'bg-destructive/10 text-destructive dark:bg-destructive/75',
    $$restProps.class,
  );
</script>

<div
  {...$$restProps}
  class={classes}
  transition:slide={{ axis: 'y', duration: withTransition ? 100 : 0 }}
>
  <slot />
</div>
