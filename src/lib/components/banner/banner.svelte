<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { fade } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    destructive?: boolean;
    withTransition?: boolean;
  };

  export let destructive: $$Props['destructive'] = false;
  export let withTransition: $$Props['withTransition'] = false;

  $: classes = twMerge(
    'w-full rounded-lg bg-muted p-2 text-center text-sm',
    destructive && 'bg-destructive/10 dark:bg-destructive/35 text-destructive',
    $$restProps.class,
  );
</script>

<div {...$$restProps} class={classes} in:fade={{ duration: withTransition ? 100 : 0 }}>
  <slot />
</div>
