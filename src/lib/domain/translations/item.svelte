<script lang="ts">
  import TranslationActions from './actions.svelte';

  import { page } from '$app/stores';
  import type { ProjectWithTranslations } from '$lib/db';
  import { Locale, LocaleContainer } from '$lib/domain/locales';

  export let translation: string;
  export let translated: number | null | undefined = undefined;
  export let locales: ProjectWithTranslations['locales'];
</script>

<li class="px-4 py-3 flex justify-between border rounded">
  <div class="flex flex-col gap-2">
    <a
      href="{$page.url.pathname}/editor/{translation}"
      class="font-semibold text-lg hover:underline hover:underline-offset-2">{translation}</a
    >
    {#if locales.length}
      <LocaleContainer>
        {#each locales as { is_default: isDefault, locale }}
          {#if locale}
            <Locale {isDefault} code={locale.code} />
          {/if}
        {/each}
      </LocaleContainer>
    {/if}
  </div>
  <div class="flex flex-col justify-between items-end gap-2">
    <TranslationActions />
    {#if typeof translated === 'number'}
      <p class="text-sm">Total locales translated: {translated}</p>
    {/if}
  </div>
</li>
