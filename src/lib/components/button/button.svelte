<script lang="ts">
  import { sharedClasses } from './shared';

  type ButtonVariant = 'condensed' | 'default';
  type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';

  export let variant: ButtonVariant = 'default';
  export let color: ButtonColor = 'primary';
  // TODO: CHange for $$props.class
  export let className = '';

  const classes = sharedClasses({
    variant,
    color,
    className,
  });
</script>

<button {...$$restProps} class={classes} on:click>
  <slot />
</button>
