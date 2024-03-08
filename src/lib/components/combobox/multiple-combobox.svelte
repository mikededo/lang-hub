<script lang="ts" generics="T">
  import { createCombobox, melt } from '@melt-ui/svelte';
  import type { ComboboxOption } from '@melt-ui/svelte';
  import { XCircle } from 'lucide-svelte';
  import { setContext } from 'svelte';

  import type { ComboboxProps } from './types';
  import { Chip, ChipContainer } from '../chip';
  import { FloatingCard } from '../floating-card';
  import { inputClasses } from '../input';

  type $$Props = ComboboxProps<ComboboxOption<T>[]>;

  export let onChangeSelected: $$Props['onChangeSelected'] = undefined;

  let { label, name } = $$props;

  const {
    elements: { menu, input, option },
    states: { open, selected },
    helpers,
  } = createCombobox<T, true>({
    multiple: true,
    forceVisible: true,
    onSelectedChange: (args) => {
      onChangeSelected?.(args);
      return args.next;
    },
  });

  setContext('melt:option', option);
  setContext('melt:option-helpers', helpers);

  const handleOnRemoveSelected = (value: T) => () => {
    $selected = ($selected ?? []).filter((item) => item.value !== value);
  };
</script>

<div class="flex w-full flex-col items-start gap-2">
  {#if label}
    <label for={name} class="text-xs font-semibold uppercase">{label}</label>
  {/if}
  {#if $selected}
    <ChipContainer>
      {#each $selected as { label, value } (value)}
        <Chip on:click={handleOnRemoveSelected(value)}>
          <span>{label}</span>
          <XCircle class="size-4" />
        </Chip>
      {/each}
    </ChipContainer>
  {/if}
  <input class={inputClasses()} placeholder="Select the languages" use:melt={$input} {name} />
</div>
{#if $open}
  <FloatingCard class="z-50 p-1" meltElement={menu}>
    <slot />
  </FloatingCard>
{/if}
