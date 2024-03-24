<script lang="ts">
  import '../global.css';

  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

  import { setSupabaseClient } from '$lib/context';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // Set the supbase client so that it can be used anywhere in the app
  setSupabaseClient(data.supabaseClient);
</script>

<QueryClientProvider client={data.queryClient}>
  <slot />
  <SvelteQueryDevtools />
</QueryClientProvider>
