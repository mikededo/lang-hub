<script lang="ts">
  import { Check } from 'lucide-svelte';

  import { ComboboxOption } from '$lib/components';
  import type { Tables } from '$lib/types';

  export let language: Tables<'languages'>;
  let { id, name, code } = language;
</script>

<ComboboxOption
  item={id}
  toOption={{ value: id, label: name }}
  class="flex items-center justify-between gap-1 data-[selected]:text-primary"
>
  <div slot="selected">
    <Check class="size-4" />
  </div>
  <p>
    <strong>{code.toUpperCase()}</strong>
    {name}
  </p>
</ComboboxOption>
