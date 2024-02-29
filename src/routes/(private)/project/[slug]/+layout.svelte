<script lang="ts">
  import { error } from '@sveltejs/kit';

  import type { LayoutData } from './$types';

  import { CreatePhraseDialog, DeletePhraseDialog } from '$lib/domain/phrases';

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
