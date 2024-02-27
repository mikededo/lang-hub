<script lang="ts">
  import { CheckCircle2 } from 'lucide-svelte';
  import { twMerge } from 'tailwind-merge';

  import { page } from '$app/stores';
  import { Input } from '$lib/components';
  import { QUERY_PARAM_KEYS } from '$lib/config';
  import type { PhrasesWithTranslations } from '$lib/db';

  export let phrases: PhrasesWithTranslations;

  $: selectedKey = $page.url.searchParams.get(QUERY_PARAM_KEYS.editorSelectedKey);

  const selectedClasses = 'border-primary bg-primary/10 text-primary hover:bg-primary/20';
</script>

<aside class="hidden lg:w-editor-aside lg:block border-r border-border shrink-0">
  <div class="py-3 px-4 w-full">
    <Input name="key" placeholder="Search keys" disabled={phrases.length === 0} />
  </div>
  {#if phrases.length === 0}
    <p class="py-3 px-4 text-center">No keys found</p>
  {:else}
    <div role="list" class="md:flex-col md:gap-[1px]">
      {#each phrases as { key, translation_count: count } (key)}
        <a
          class={twMerge(
            'py-3 px-4 flex gap-2 border-y border-transparent hover:bg-muted transition-colors cursor-pointer',
            selectedKey === key && selectedClasses,
          )}
          href="?{QUERY_PARAM_KEYS.editorSelectedKey}={key}"
        >
          <CheckCircle2 class="w-4 h-4 mt-0.5" />
          <div class="flex flex-col">
            <p class="text-sm font-semibold">
              {key}
            </p>
            <span class="text-xs">Total translated: {count}</span>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</aside>
