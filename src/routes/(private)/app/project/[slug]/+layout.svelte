<script lang="ts">
  import { error } from '@sveltejs/kit';

  import { CreatePhraseDialog, DeletePhraseDialog } from '$lib/domain/phrases';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
  const { slug, supabaseClient } = data;

  $: if (isNaN(+slug)) {
    error(404, 'Project not found');
  }
  $: if (!supabaseClient) {
    error(500, 'Supabase client not found');
  }
</script>

<slot />

<CreatePhraseDialog {supabaseClient} projectId={+slug} />
<DeletePhraseDialog {supabaseClient} projectId={+slug} />
