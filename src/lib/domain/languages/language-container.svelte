<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let className: string = '';
  const classes = twMerge('flex gap-1 text-xs', className);
</script>

<div class={classes}>
  <slot />
</div>
