<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';

  import { pathTo } from '$lib/config';
  import type { ProjectWithLanguages } from '$lib/db';
  import { Language, LanguageContainer } from '$lib/domain/languages';

  let didPrefetch = false;

  export let onPrefetch: ((id: ProjectWithLanguages['id']) => void) | undefined = undefined;
  export let project: ProjectWithLanguages;
  const { id, name, website_url: website, languages, last_updated } = project;

  const handleOnPrefetchProject = () => {
    if (didPrefetch) {
      return;
    }

    onPrefetch?.(id);
    didPrefetch = true;
  };
</script>

<div class="flex h-40 w-full gap-6 rounded border border-border p-4">
  <div class="h-24 w-24 shrink-0 rounded bg-muted" />
  <div class="flex w-full flex-col justify-between">
    <div class="flex items-center gap-1 self-end">
      <a
        href={pathTo('project', { project: `${id}` })}
        class="text-lg font-bold hover:underline"
        on:mouseenter={handleOnPrefetchProject}
      >
        {name}
      </a>
      {#if website}
        <a
          href={website}
          class="cursor-pointer rounded-sm p-1 transition-colors hover:bg-muted"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink class="h-4 w-4" />
        </a>
      {/if}
    </div>
    <div class="flex w-full flex-col gap-2 text-xs">
      {#if languages.length > 0}
        <LanguageContainer className="self-end">
          {#each languages as { code, language_id, is_default } (language_id)}
            <Language {code} isDefault={is_default} />
          {/each}
        </LanguageContainer>
      {/if}
      <div class="flex flex-col items-end">
        <p>90% translated</p>
        {#if last_updated}
          <p>Last updated: {new Date(last_updated).toLocaleDateString()}</p>
        {/if}
      </div>
    </div>
  </div>
</div>
