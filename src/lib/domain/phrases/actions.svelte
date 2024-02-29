<script lang="ts">
  import { Copy, Settings, Trash } from 'lucide-svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { IconButton, TextIconButton } from '$lib/components';
  import { QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';

  export let translationKey: string;

  const handleOnDelete = () => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.set(QUERY_PARAM_KEYS.dialog, QUERY_PARAM_VALUES.dialog.deletePhrase);
    params.set(QUERY_PARAM_KEYS.translationKey, translationKey);

    goto(`${$page.url.pathname}?${params.toString()}`);
  };
</script>

<div class="flex items-center gap-2.5">
  <TextIconButton Icon={Copy} variant="condensed" color="secondary">Duplicate</TextIconButton>
  <div class="h-6 w-[1px] bg-gray-200" />
  <div class="flex gap-1">
    <IconButton color="muted" Icon={Settings} size="small" />
    <IconButton color="destructive" Icon={Trash} size="small" on:click={handleOnDelete} />
  </div>
</div>
