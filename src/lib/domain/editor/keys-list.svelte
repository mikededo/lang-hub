<script lang="ts">
  import { CheckCircle2 } from 'lucide-svelte';

  import { page } from '$app/stores';
  import { QUERY_PARAM_KEYS } from '$lib/config';
  import type { ProjectWithTranslations } from '$lib/db';

  export let translations: ProjectWithTranslations['translations'];

  $: selectedKey = $page.url.searchParams.get(QUERY_PARAM_KEYS.editorSelectedKey);

  const selectedClasses = 'border-primary bg-primary/10 text-primary hover:bg-primary/20';
</script>

<aside class="hidden lg:w-editor-aside lg:block border-r border-border shrink-0">
  <div class="py-3 px-4 w-full">
    <input
      name="key"
      placeholder="Search keys"
      class="h-10 w-full ring ring-transparent border transition-all focus:ring-offset-white focus:ring-offset-2 focus:ring-primary rounded px-3 py-1 outline-none"
      disabled={translations.length === 0}
    />
  </div>
  {#if translations.length === 0}
    <p class="py-3 px-4 text-center">No keys found</p>
  {:else}
    <div role="list" class="md:flex-col md:gap-[1px]">
      {#each translations as translation (translation?.translation_key)}
        {#if translation}
          <a
            class="py-3 px-4 flex gap-2 border-y border-transparent hover:bg-muted transition-colors cursor-pointer {selectedKey ===
            translation.translation_key
              ? selectedClasses
              : ''}"
            href="?{QUERY_PARAM_KEYS.editorSelectedKey}={translation.translation_key}"
          >
            <CheckCircle2 class="w-4 h-4 mt-0.5" />
            <div class="flex flex-col">
              <p class="text-sm font-semibold">
                {translation.translation_key}
              </p>
              <span class="text-xs">Total translated: {translation.total_translated}</span>
            </div>
          </a>
        {/if}
      {/each}
    </div>
  {/if}
</aside>
