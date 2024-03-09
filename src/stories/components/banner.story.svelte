<script lang="ts">
  import type { Hst as IHst } from '@histoire/plugin-svelte';

  import { Banner } from '$lib/components';

  export let Hst: IHst;
  let { Story, Variant, Checkbox } = Hst;
</script>

<Story title="Banners" layout={{ type: 'grid', width: 300 }}>
  <Variant title="Default">
    <Banner>This is the default banner</Banner>
  </Variant>
  <Variant title="Destructive">
    <Banner destructive>This is a destructive banner</Banner>
  </Variant>

  <svelte:fragment slot="controls">
    <Checkbox title="destructive" />
  </svelte:fragment>
</Story>
