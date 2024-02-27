<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let className: string | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let name: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let label: string | undefined = undefined;
  export let value: string = '';

  $: classes = twMerge(
    'h-10 w-full ring ring-transparent border transition-all focus:ring-offset-white focus:ring-offset-2 focus:ring-primary rounded px-3 py-1 outline-none',
    className,
  );
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={name} class="text-xs font-semibold uppercase">{label}</label>
  {/if}
  <input {name} {placeholder} {disabled} class={classes} {value} />
</div>
