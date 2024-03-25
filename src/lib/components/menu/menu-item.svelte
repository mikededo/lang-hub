<script lang="ts">
  import type { AnyMeltElement } from '@melt-ui/svelte';
  import { melt } from '@melt-ui/svelte';
  import type { Icon as LucideIcon } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    destructive?: boolean;
    Icon?: ComponentType<LucideIcon>;
  };

  export let destructive: $$Props['destructive'] = false;
  export let Icon: $$Props['Icon'] = undefined;

  // Get the builder
  let element = getContext<AnyMeltElement>('melt:item');
  if (!element) {
    throw new Error('MenuItem missing melt:item context');
  }

  $: classes = twMerge(
    'flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-muted',
    destructive && 'text-destructive hover:bg-destructive/10 dark:hover:bg-destructive-900/50',
    $$restProps.class,
  );
</script>

<div class="w-full px-2 first:pt-2 last:pb-2">
  <div {...$$restProps} class={classes} use:melt={$element} role="button" tabindex="0" on:click>
    {#if Icon}
      <svelte:component this={Icon} class="h-3 w-3" />
    {/if}
    <slot />
  </div>
</div>
