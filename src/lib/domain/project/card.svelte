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

<div class="flex w-full gap-6 rounded border p-4">
  <div class="h-28 w-28 shrink-0 rounded bg-muted" />
  <div class="flex w-full flex-col justify-between">
    <div class="flex items-center gap-1 self-end">
      <a
        href={Paths.project(id)}
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
