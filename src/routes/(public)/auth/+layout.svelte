<script lang="ts">
  import { fade } from 'svelte/transition';

  import type { LayoutServerData } from './$types';

  export let data: LayoutServerData;
</script>

<main>
  <div class="fixed left-0 top-0 -z-10 h-full w-full">
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e7e7e7_1px,transparent_1px)] [background-size:16px_16px]"
    />
  </div>
  <div class="flex min-h-screen items-center">
    <div
      class="fixed inset-0 overflow-auto bg-white p-8 md:relative md:mx-auto md:w-full md:max-w-md md:rounded md:border"
    >
      {#key data.pathname}
        <div in:fade={{ duration: 200 }}>
          <slot />
        </div>
      {/key}
    </div>
  </div>
</main>
