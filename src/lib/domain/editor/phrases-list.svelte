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

<aside class="hidden shrink-0 border-r border-border lg:block lg:w-editor-aside">
  <div class="w-full px-4 py-3">
    <Input name="key" placeholder="Search keys" disabled={phrases.length === 0} />
  </div>
  {#if phrases.length === 0}
    <p class="px-4 py-3 text-center">No keys found</p>
  {:else}
    <div role="list" class="md:flex-col md:gap-[1px]">
      {#each phrases as { key, translation_count: count } (key)}
        <a
          class={twMerge(
            'flex cursor-pointer gap-2 border-y border-transparent px-4 py-3 transition-colors hover:bg-muted',
            selectedKey === key && selectedClasses,
          )}
          href="?{QUERY_PARAM_KEYS.editorSelectedKey}={key}"
        >
          <CheckCircle2 class="mt-0.5 h-4 w-4" />
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
