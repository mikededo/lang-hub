<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';

  import { Paths } from '$lib/config';
  import type { ProjectWithLanguages } from '$lib/db';
  import { Language, LanguageContainer } from '$lib/domain/languages';

  let didPrefetch = false;

  export let onPrefetch: ((id: ProjectWithLanguages['id']) => void) | undefined = undefined;
  export let project: ProjectWithLanguages;
  const { id, name, website_url: website, languages } = project;

  const handleOnPrefetchProject = () => {
    if (didPrefetch) {
      return;
    }

    onPrefetch?.(id);
    didPrefetch = true;
  };
</script>

<div class="w-full p-4 flex gap-6 border rounded">
  <div class="h-28 w-28 bg-muted shrink-0 rounded" />
  <div class="flex flex-col w-full justify-between">
    <div class="flex self-end items-center gap-1">
      <a
        href={Paths.project(id)}
        class="font-bold text-lg hover:underline"
        on:mouseenter={handleOnPrefetchProject}
      >
        {name}
      </a>
      {#if website}
        <a
          href={website}
          class="hover:bg-muted rounded-sm transition-colors p-1 cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink class="w-4 h-4" />
        </a>
      {/if}
    </div>
    <div class="text-xs w-full flex flex-col gap-2">
      {#if languages.length > 0}
        <LanguageContainer className="self-end">
          {#each languages as { code, is_default } (code)}
            <Language {code} isDefault={is_default} />
          {/each}
        </LanguageContainer>
      {/if}
      <div class="flex justify-between">
        <p>{new Date().toLocaleDateString()}</p>
        <p>90% translated</p>
      </div>
    </div>
  </div>
</div>
