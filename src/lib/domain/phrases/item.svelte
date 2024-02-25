<script lang="ts">
  import PhraseActions from './actions.svelte';

  import { page } from '$app/stores';
  import { Paths, QUERY_PARAM_KEYS } from '$lib/config';
  import type { ProjectWithPhrases } from '$lib/db';
  import { Language, LanguageContainer } from '$lib/domain/languages';

  export let phrase: string;
  export let translated: number | null | undefined = undefined;
  export let languages: ProjectWithPhrases['languages'];

  const queryParams = { [QUERY_PARAM_KEYS.editorSelectedKey]: phrase };
</script>

<li class="px-4 py-3 flex justify-between border rounded">
  <div class="flex flex-col gap-2">
    <a
      href={Paths.editor($page.params.slug, { queryParams })}
      class="font-semibold text-lg hover:underline hover:underline-offset-2"
    >
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
  <div class="flex flex-col justify-between items-end gap-2">
    <PhraseActions translationKey={phrase} />
    {#if typeof translated === 'number'}
      <p class="text-sm">Total locales translated: {translated}</p>
    {/if}
  </div>
</li>
