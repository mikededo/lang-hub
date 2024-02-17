<script lang="ts">
  import type { IconProps, Icon as LucideIcon } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  type IconButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
  type IconButtonSizes = 'small' | 'default' | 'large';

  export let Icon: ComponentType<LucideIcon>;
  export let size: IconButtonSizes = 'default';
  export let color: IconButtonColor = 'primary';
  export let href: string | undefined = undefined;
  export let strokeWidth: IconProps['strokeWidth'] = undefined;

  const iconWrapperClasses =
    'h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer';

  $: iconProps = { strokeWidth };

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

{#if href}
  <a {...$$restProps} class={twMerge(iconWrapperClasses, colors[color], $$restProps.class)} {href}>
    <svelte:component
      this={Icon}
      class={twMerge(iconSizes[size], 'stroke-inherit')}
      {...iconProps}
    />
  </a>
{:else}
  <button
    {...$$restProps}
    class={twMerge(iconWrapperClasses, colors[color], $$restProps.class)}
    on:click
  >
    <svelte:component
      this={Icon}
      class={twMerge(iconSizes[size], 'stroke-inherit')}
      {...iconProps}
    />
  </button>
{/if}
