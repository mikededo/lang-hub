<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { QUERY_PARAM_KEYS, QUERY_PARAM_VALUES } from '$lib/config';

  const handleOnCreate = () => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.set(QUERY_PARAM_KEYS.dialog, QUERY_PARAM_VALUES.dialog.createProject);
    goto(`${$page.url.pathname}?${params.toString()}`);
  };
</script>

<button
  class="flex h-40 w-full cursor-pointer items-center justify-center rounded border border-dashed outline-none transition-colors hover:bg-muted/50 focus:bg-muted/50"
  on:click={handleOnCreate}
>
  <p class="text-muted-foreground">Create a new project</p>
</button>
