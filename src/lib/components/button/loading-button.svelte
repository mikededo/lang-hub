<script lang="ts">
  import { Loader2 } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  import { default as Button } from './button.svelte';

  type $$Props = Button['$$prop_def'] & {
    loaderProps?: Loader2['$$prop_def'];
    loading?: boolean;
    loadingSize?: 'small' | 'default' | 'large';
  };

  $: ({ loading, loadingSize = 'default', loaderProps, ...props } = $$restProps as $$Props);
  $: iconClasses = twMerge(
    'animate-spin',
    loadingSize === 'small' && 'size-4',
    loadingSize === 'default' && 'size-5',
    loadingSize === 'large' && 'size-6',
  );
</script>

<Button {...props} on:click>
  <span class="flex items-center justify-center">
    {#if loading}
      <span transition:slide={{ axis: 'x' }} class="mr-2">
        <Loader2 {...loaderProps} class={iconClasses} />
      </span>
    {/if}
    <slot />
  </span>
</Button>
