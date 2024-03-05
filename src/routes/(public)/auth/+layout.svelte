<script lang="ts">
  import { fade } from 'svelte/transition';

  import type { LayoutServerData } from './$types';

  export let data: LayoutServerData;
</script>

<svelte:head>
  <title>Authentication | Lang Hub</title>
  <meta name="description" content="Sign in or sign up to access your Lang Hub account" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="theme-color" content="#ffffff" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="apple-mobile-web-app-title" content="Lang Hub" />
  <meta name="application-name" content="Lang Hub" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="TBD" />
  <meta property="og:title" content="Authentication | Lang Hub" />
  <meta property="og:description" content="Sign in or sign up to access your Lang Hub account" />
  <meta property="og:image" content="TBD" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<main>
  <div class="fixed left-0 top-0 -z-10 h-full w-full bg-background">
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e7e7e7_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#333333_1px,transparent_1px)]"
    />
  </div>
  <div class="flex min-h-screen items-center">
    <div
      class="fixed inset-0 overflow-auto bg-background p-8 md:relative md:mx-auto md:w-full md:max-w-md md:rounded md:border"
    >
      {#key data.pathname}
        <div in:fade={{ duration: 200 }}>
          <slot />
        </div>
      {/key}
    </div>
  </div>
</main>
