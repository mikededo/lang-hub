<script lang="ts" generics="T">
  import type { ComboboxOptionProps, createCombobox } from '@melt-ui/svelte';
  import { melt } from '@melt-ui/svelte';
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  type ComboboxResult = ReturnType<typeof createCombobox<T>>;
  type ComboboxOption = ComboboxResult['elements']['option'];
  type ComboboxHelpers = ComboboxResult['helpers'];
  type $$Props = HTMLAttributes<HTMLDivElement> & {
    item: T;
    toOption: ComboboxOptionProps<T> | ((item: T) => ComboboxOptionProps<T>);
  };

  export let item: T;
  export let toOption: ComboboxOptionProps<T> | ((item: T) => ComboboxOptionProps<T>);

  // Get the builder
  let option = getContext<ComboboxOption>('melt:option');
  if (!option) {
    throw new Error('ComboboxOption missing melt:option context');
  }

  let optionHelpers = getContext<ComboboxHelpers>('melt:option-helpers');
  if (!optionHelpers) {
    throw new Error('ComboboxOption missing melt:option-helpers context');
  }
  let { isSelected } = optionHelpers;

  $: classes = twMerge(
    'data-[highlighted]:primary relative w-full cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4 hover:bg-primary/50 data-[disabled]:cursor-not-allowed data-[highlighted]:bg-muted data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent',
    $$restProps.class,
  );

  $: optionValue = typeof toOption === 'function' ? toOption(item) : toOption;
</script>

<div use:melt={$option(optionValue)} class={classes}>
  <slot />
  {#if $isSelected(item)}
    <slot name="selected" />
  {/if}
</div>
