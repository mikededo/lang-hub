<script>
  import { twMerge } from 'tailwind-merge';

  $: className = twMerge('container p-6 xl:p-0', $$restProps.class);
</script>

<div class={className}>
  <slot />
</div>
