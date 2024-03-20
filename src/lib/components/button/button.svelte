<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  import { sharedClasses } from './shared';

  type ButtonVariant = 'condensed' | 'default';
  type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
  type BaseProps =
    | (HTMLAnchorAttributes & { href: string })
    | (HTMLButtonAttributes & { href?: never });
  type $$Props = BaseProps & {
    variant?: ButtonVariant;
    color?: ButtonColor;
  };

  export let variant: $$Props['variant'] = 'default';
  export let color: $$Props['color'] = 'primary';

  const classes = sharedClasses({
    variant,
    color,
    className: $$props.class,
  });
</script>

{#if $$restProps.href}
  <a {...$$restProps} href={$$restProps.href} class={classes} on:click>
    <slot />
  </a>
{:else}
  <button {...$$restProps} class={classes} on:click>
    <slot />
  </button>
{/if}
