<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let isDefault: boolean | null = null;
  export let code: string | null;

  const classes = twMerge(
    'rounded-full bg-muted px-2 py-0.5 font-semibold',
    isDefault && 'bg-primary text-white',
  );
</script>

{#if code}
  <p class={classes}>
    {code.toUpperCase()}
  </p>
{/if}
