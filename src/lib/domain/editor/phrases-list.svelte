<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  import { page } from '$app/stores';
  import { CheckedIcon, Input } from '$lib/components';
  import { QUERY_PARAM_KEYS } from '$lib/config';
  import type { ProjectWithPhrases } from '$lib/db';

  export let phrases: ProjectWithPhrases['phrases'];

  $: selectedKey = $page.url.searchParams.get(QUERY_PARAM_KEYS.editorSelectedKey);

  const selectedClasses = 'border-primary bg-primary/10 text-primary hover:bg-primary/20';
</script>

<aside
  class="hidden max-h-editor shrink-0 overflow-auto overflow-x-hidden border-r border-border lg:block lg:w-editor-aside"
>
  <div class="sticky top-0 w-full border-b bg-background px-4 py-3">
    <Input name="key" placeholder="Search keys" disabled={phrases.length === 0} />
  </div>
  {#if phrases.length === 0}
    <p class="px-4 py-3 text-center">No keys found</p>
  {:else}
    <div role="list" class="md:flex-col md:gap-[1px]">
      {#each phrases as { key, translated_count: count } (key)}
        <a
          class={twMerge(
            'flex cursor-pointer gap-2 border-y border-transparent px-4 py-3 transition-colors hover:bg-muted',
            selectedKey === key && selectedClasses,
          )}
          href="?{QUERY_PARAM_KEYS.editorSelectedKey}={key}"
        >
          <CheckedIcon checked={selectedKey === key} />
          <div class="flex flex-col">
            <p class="text-sm font-semibold">
              {key}
            </p>
            <span class="text-xs">Languages translated: {count}</span>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</aside>
