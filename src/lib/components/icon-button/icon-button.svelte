<script lang="ts">
  import type { Icon as LucideIcon } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  type IconButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
  type IconButtonSizes = 'small' | 'default' | 'large';

  export let Icon: ComponentType<LucideIcon>;
  export let size: IconButtonSizes = 'default';
  export let color: IconButtonColor = 'primary';

  const iconWrapperClasses =
    'h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer';

  let iconSizes: Record<IconButtonSizes, string>;
  $: iconSizes = {
    small: 'w-4 h-5',
    default: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  let colors: Record<IconButtonColor, string>;
  $: colors = {
    primary: 'hover:bg-primary/90 stroke-primary-foreground',
    secondary: 'hover:bg-secondary/90 stroke-secondary-foreground',
    muted: 'hover:bg-muted stroke-foreground',
    destructive: 'hover:bg-destructive/10 stroke-destructive',
  };
</script>

<button class={twMerge(iconWrapperClasses, colors[color])} {...$$restProps} on:click>
  <svelte:component this={Icon} class={twMerge(iconSizes[size], 'stroke-inherit')} />
</button>
