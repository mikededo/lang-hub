<script lang="ts">
  import { sharedClasses } from './shared';

  type ButtonVariant = 'condensed' | 'default';
  type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';

  export let variant: ButtonVariant = 'default';
  export let color: ButtonColor = 'primary';
  // TODO: Change for $$props.class
  export let className = '';

  const classes = sharedClasses({
    variant,
    color,
    className,
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
