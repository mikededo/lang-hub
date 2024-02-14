<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { ArrowLeftIcon, FilePlus2 } from 'lucide-svelte';

  import type { PageData } from './$types';

  import { TextIconButton } from '$lib/components';
  import { Keys } from '$lib/config';
  import { getProject } from '$lib/db';
  import { TranslationsList } from '$lib/domain/translations';

  export let data: PageData;
  const query = createQuery({
    queryKey: Keys.PROJECT(data.slug),
    queryFn: async () => await getProject(+data.slug),
  });
</script>

<div class="flex flex-col gap-2">
  <div class="flex justify-between gap-4">
    <a
      class="flex items-center gap-1.5 text-sm font-semibold py-1 px-2 rounded-full cursor-pointer transition-colors hover:bg-muted"
      href="/"
    >
      <ArrowLeftIcon class="w-4 h-4" strokeWidth={3} />
      <span>Go back</span>
    </a>
    <!-- <Breadcrumbs /> -->
  </div>
  {#if $query.data}
    <div class="flex flex-col gap-8">
      <div class="flex justify-between">
        <h2 class="text-4xl font-bold">{$query.data.name}</h2>
        <TextIconButton Icon={FilePlus2}>Add translation</TextIconButton>
      </div>
      <TranslationsList translations={$query.data.translations} locales={$query.data.locales} />
    </div>
  {/if}
</div>
