<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let isDefault: boolean | null = null;
  export let code: string;

  const classes = twMerge(
    'rounded-full bg-muted py-0.5 px-2 font-semibold',
    isDefault && 'bg-primary text-primary-foreground',
  );
</script>

<p class={classes}>
  {code.toUpperCase()}
</p>
