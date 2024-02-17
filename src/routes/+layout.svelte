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
  <div class="w-full h-full">
    <header class="border-b">
      <div class="flex gap-1 py-4 px-6 items-center justify-between">
        <h1 class="font-bold text-xl flex-1">LangHub</h1>
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
