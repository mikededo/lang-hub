<script lang="ts">
  import { error } from '@sveltejs/kit';

  import type { PageData } from './$types';

  import { CreatePhraseDialog, DeletePhraseDialog } from '$lib/domain/phrases';

  export let data: PageData;
  $: if (isNaN(+data.slug)) {
    error(404, 'Project not found');
  }
</script>

<slot />

<CreatePhraseDialog projectId={+data.slug} />
<DeletePhraseDialog projectId={+data.slug} />
