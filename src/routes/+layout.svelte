<script lang="ts">
  import '../global.css';

  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
  import { Moon, Settings2 } from 'lucide-svelte';

  import type { PageData } from './$types';

  import { IconButton } from '$lib/components';

  export let data: PageData;
</script>

<QueryClientProvider client={data.queryClient}>
  <div class="h-full w-full">
    <header class="border-b">
      <div class="flex items-center justify-between gap-1 px-6 py-4">
        <h1 class="flex-1 text-xl font-bold">LangHub</h1>
        <IconButton Icon={Settings2} color="muted" />
        <IconButton Icon={Moon} color="muted" />
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>
