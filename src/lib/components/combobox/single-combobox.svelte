<script lang="ts" generics="T">
  import { type ComboboxOption, createCombobox } from '@melt-ui/svelte';
  import { setContext } from 'svelte';

  import type { ComboboxProps } from './types';
  import { FloatingCard } from '../floating-card';
  import { Input } from '../input';

  type $$Props = ComboboxProps<ComboboxOption<T>>;

  export let onChangeSelected: $$Props['onChangeSelected'] = undefined;
  export let value = '';

  const {
    elements: { menu, input, option },
    states: { open, inputValue, selected },
    helpers,
  } = createCombobox<T, false>({
    forceVisible: true,
    onSelectedChange: (args) => {
      onChangeSelected?.(args);
      return args.next;
    },
  });

  setContext('melt:option', option);
  setContext('melt:option-helpers', helpers);

  $: value = $input.value;
  $: if (!$open) {
    $inputValue = $selected?.label ?? '';
  }
</script>

<Input {...$$restProps} meltElement={input} />
{#if $open}
  <FloatingCard class="z-50 p-1" meltElement={menu}>
    <slot />
  </FloatingCard>
{/if}
