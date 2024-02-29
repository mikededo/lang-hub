<script lang="ts">
  import { Moon, Settings2 } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  import { afterNavigate } from '$app/navigation';
  import { IconButton } from '$lib/components';

  let fromAuth = false;

  afterNavigate(({ from }) => {
    if (from?.url.pathname.startsWith('/auth')) {
      fromAuth = true;
      setTimeout(() => {
        fromAuth = false;
      }, 1500);
    }
  });
</script>

<div class="h-full w-full" in:fade={{ delay: 2500 }}>
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

{#if fromAuth}
  <div class="fixed inset-0 z-[index=999] flex items-center bg-white" />
  <div
    class="fixed inset-0 z-[index=1000] flex items-center bg-primary"
    in:fade={{ duration: 200 }}
    out:fade
  >
    <p class="m-auto animate-none text-center text-2xl font-semibold text-primary-foreground">
      We are preparing everything<br /> for you 🚀
    </p>
  </div>
  <div
    class="fixed inset-0 animate-pulse bg-[radial-gradient(#BAB0F277_1px,transparent_1px)] [background-size:20px_20px]"
  />
{/if}
