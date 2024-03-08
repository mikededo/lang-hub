<script lang="ts">
  import ComboboxOption from './combobox-option.svelte';

  export let item = 'Disabled';
</script>

<ComboboxOption {item} toOption={{ value: 'disabled', disabled: true }}>
  <slot />
</ComboboxOption>
