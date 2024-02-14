<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';

  import { Locale, LocaleContainer } from '../locales';

  import type { ProjectWithLocales } from '$lib/db';

  export let project: ProjectWithLocales;
  const { id, name, website_url: website, locales } = project;
</script>

<div class="w-full p-4 flex gap-6 border rounded">
  <div class="h-28 w-28 bg-muted shrink-0 rounded" />
  <div class="flex flex-col w-full justify-between">
    <div class="flex self-end items-center gap-1">
      <a href="/project/{id}" class="font-bold text-lg hover:underline">
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
      {#if locales.length > 0}
        <LocaleContainer className="self-end">
          {#each locales as { locale_code: code } (code)}
            <Locale {code} />
          {/each}
        </LocaleContainer>
      {/if}
      <div class="flex justify-between">
        <p>{new Date().toLocaleDateString()}</p>
        <p>90% translated</p>
      </div>
    </div>
  </div>
</div>
