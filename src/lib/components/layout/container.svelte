<script>
  import { twMerge } from 'tailwind-merge';

  $: className = twMerge('container p-6 xl:px-0', $$restProps.class);
</script>

<div class={className}>
  <slot />
</div>
