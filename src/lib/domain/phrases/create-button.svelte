<script lang="ts">
  import { FilePlus2 } from 'lucide-svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { TextIconButton } from '$lib/components';
  import { QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';

  const handleOnCreate = () => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.set(QUERY_PARAM_KEYS.dialog, QUERY_PARAM_VALUES.dialog.createPhrase);
    goto(`${$page.url.pathname}?${params.toString()}`);
  };
</script>

<TextIconButton Icon={FilePlus2} on:click={handleOnCreate}>Add phrase</TextIconButton>
