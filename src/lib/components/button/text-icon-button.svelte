<script lang="ts">
  import type { Icon as LucideIcon } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  import { sharedClasses } from './shared';

  type ButtonVariant = 'condensed' | 'default';
  type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';

  export let variant: ButtonVariant = 'default';
  export let color: ButtonColor = 'primary';
  export let Icon: ComponentType<LucideIcon>;
  export let className = '';

  const classes = sharedClasses({
    variant,
    color,
    className: `${className} flex gap-1.5 items-center`,
  });
</script>

<button {...$$restProps} class={classes} on:click>
  <svelte:component this={Icon} class="h-4 w-4" />
  <span><slot /></span>
</button>
