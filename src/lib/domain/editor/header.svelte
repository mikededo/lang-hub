<script lang="ts">
  import { ArrowLeftIcon } from 'lucide-svelte';

  import { IconButton } from '$lib/components';
  import { Paths } from '$lib/config';
  import { CreatePhraseButton } from '$lib/domain/phrases';

  export let projectId: string;
</script>

<!-- TODO: Extract into component  -->
<div class="w-full flex border-b">
  <aside class="hidden lg:w-editor-aside lg:block border-r border-border shrink-0 p-3">
    <a
      class="flex items-center gap-1.5 text-sm font-semibold py-1 px-2 rounded-full cursor-pointer transition-colors hover:bg-muted w-fit"
      href={Paths.project(projectId)}
    >
      <ArrowLeftIcon class="w-4 h-4" strokeWidth={3} />
      <span>Go back</span>
    </a>
  </aside>
  <section class="w-full flex gap-2 items-center px-4 py-3">
    <IconButton
      class="lg:hidden"
      Icon={ArrowLeftIcon}
      color="muted"
      strokeWidth={2.5}
      href={Paths.project(projectId)}
    />
    <h2 class="text-2xl font-bold flex-1">Editor</h2>
    <div>
      <CreatePhraseButton />
    </div>
  </section>
</div>
