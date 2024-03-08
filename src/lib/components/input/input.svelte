<script lang="ts">
  import { type AnyMeltElement, emptyMeltElement, melt } from '@melt-ui/svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { inputClasses } from './input';

  type $$Props = HTMLInputAttributes & {
    invalid?: boolean;
    label?: string;
    meltElement?: AnyMeltElement;
  };

  export let label: string = '';
  export let value: string = '';
  export let invalid: boolean = false;
  export let meltElement: AnyMeltElement | undefined = undefined;

  $: classes = inputClasses({ className: $$props.class, invalid });
  $: element = meltElement ?? emptyMeltElement;
</script>

<div class="flex w-full flex-col items-start gap-2">
  {#if label}
    <label for={$$props.name} class="text-xs font-semibold uppercase">{label}</label>
  {/if}
  <input class={classes} bind:value use:melt={$element} {...$$restProps} />
</div>
