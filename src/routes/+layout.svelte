<script lang="ts">
  import '../global.css';

  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
  <slot />
  <SvelteQueryDevtools />
</QueryClientProvider>
