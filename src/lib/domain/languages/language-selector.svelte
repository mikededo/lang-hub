<script lang="ts">
  import type {
    MultipleCombobox as MultipleComboboxType,
    SingleCombobox as SingleComboboxType,
  } from '$lib/components';
  import { EmptyComboboxOption, MultipleCombobox, SingleCombobox } from '$lib/components';
  import type { Tables } from '$lib/types';

  import LanguageComboboxOption from './language-combobox-option.svelte';

  // Typing with number as the value is the id of the language, which is a number
  type SingleComboboxProps = SingleComboboxType<number>['$$prop_def'];
  type MultipleComboboxProps = MultipleComboboxType<number>['$$prop_def'];
  type $$Props = {
    languages: Tables<'languages'>[];
  } & (({ multiple: true } & MultipleComboboxProps) | ({ multiple?: false } & SingleComboboxProps));

  // Value used to filter the languages
  let value = '';

  $: ({ languages, multiple = false, ...comboboxProps } = $$props);
  $: Component = multiple ? MultipleCombobox : SingleCombobox;

  $: filteredLanguages = !value
    ? languages
    : (languages as $$Props['languages']).filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase()),
      );
</script>

<svelte:component this={Component} bind:value {...comboboxProps}>
  {#if filteredLanguages?.length}
    {#each filteredLanguages as language (language.id)}
      <LanguageComboboxOption {language} />
    {/each}
  {:else}
    <EmptyComboboxOption>No results</EmptyComboboxOption>
  {/if}
</svelte:component>
