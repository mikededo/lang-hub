<script lang="ts">
  import PhraseActions from './actions.svelte';

  import { page } from '$app/stores';
  import { QUERY_PARAM_KEYS, pathTo } from '$lib/config';
  import type { ProjectWithPhrases } from '$lib/db';
  import { Language, LanguageContainer } from '$lib/domain/languages';

  export let phrase: string;
  export let translated: number | null | undefined = undefined;
  export let languages: ProjectWithPhrases['languages'];

  const queryParams = new URLSearchParams({ [QUERY_PARAM_KEYS.editorSelectedKey]: phrase });
  const href = `${pathTo('editor', { project: $page.params.slug })}?${queryParams.toString()}`;
</script>

<li class="flex justify-between rounded border border-border px-4 py-3">
  <div class="flex flex-col gap-2">
    <a {href} class="text-lg font-semibold hover:underline hover:underline-offset-2">
      {phrase}
    </a>
    {#if languages.length}
      <LanguageContainer>
        {#each languages as { code, is_default } (code)}
          <Language {code} isDefault={is_default} />
        {/each}
      </LanguageContainer>
    {/if}
  </div>
  <div class="flex flex-col items-end justify-between gap-2">
    <PhraseActions translationKey={phrase} />
    {#if typeof translated === 'number'}
      <p class="text-sm">Total locales translated: {translated}</p>
    {/if}
  </div>
</li>
