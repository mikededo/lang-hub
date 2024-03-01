<script lang="ts">
  import { ArrowLeftIcon } from 'lucide-svelte';

  import { IconButton } from '$lib/components';
  import { pathTo } from '$lib/config';
  import { CreatePhraseButton } from '$lib/domain/phrases';

  export let projectId: string;
</script>

<!-- TODO: Extract into component  -->
<div class="flex w-full border-b">
  <aside class="hidden shrink-0 border-r border-border p-3 lg:block lg:w-editor-aside">
    <a
      class="flex w-fit cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold transition-colors hover:bg-muted"
      href={pathTo('project', { project: projectId })}
    >
      <ArrowLeftIcon class="h-4 w-4" strokeWidth={3} />
      <span>Go back</span>
    </a>
  </aside>
  <section class="flex w-full items-center gap-2 px-4 py-3">
    <IconButton
      class="lg:hidden"
      Icon={ArrowLeftIcon}
      color="muted"
      strokeWidth={2.5}
      href={pathTo('project', { project: projectId })}
    />
    <h2 class="flex-1 text-2xl font-bold">Editor</h2>
    <div>
      <CreatePhraseButton />
    </div>
  </section>
</div>
