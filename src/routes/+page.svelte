<script lang="ts">
  import type { PageData } from './$types';

  import { Button } from '$lib/components';
  import { pathTo } from '$lib/config';
  import { Pricing } from '$lib/domain/landing';

  export let data: PageData;
</script>

<header class="w-full bg-muted/90 pb-12 pt-8 md:py-24">
  <div class="px-4 md:px-6">
    <div class="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
      <div class="mb-4 flex flex-col justify-center">
        <div class="mb-2 flex flex-col gap-2 md:mb-8">
          <h1 class="text-3xl font-bold sm:text-5xl">
            The modern platform for localization and translation.
          </h1>
          <p
            class="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Streamline your translation process with automated workflows, integrated collaboration,
            and powerful management tools.
          </p>
        </div>
        <div class="flex flex-row gap-2">
          <Button href={data.session ? pathTo('app') : pathTo('signUp')}>
            {data.session ? 'Go to the app!' : 'Sign up'}
          </Button>
          <Button color="secondary" href={pathTo('home')}>Learn more</Button>
        </div>
      </div>
      <img
        src="https://generated.vusercontent.net/placeholder.svg"
        width="550"
        height="310"
        alt="Placeholder"
        class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
      />
    </div>
  </div>
</header>
<main>
  <section class="mt-12 w-full md:mt-24 lg:mt-32">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Key Benefits
          </div>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
            Unlock the Power of Localization
          </h2>
          <p
            class="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Improve collaboration, streamline your translation process, and increase efficiency with
            lang-hub's powerful platform.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="my-12 w-full md:my-24 lg:my-32">
    <div class="container px-8 lg:px-12">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-12">
        <div
          class="rounded border border-transparent p-4 transition-colors hover:border-border hover:bg-muted"
        >
          <h3 class="mb-1 text-lg font-bold">Automated Workflows</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Let your team focus on creating content while lang-hub handles the localization process.
          </p>
        </div>
        <div
          class="rounded border border-transparent p-4 transition-colors hover:border-border hover:bg-muted"
        >
          <h3 class="text-lg font-bold">Integrated Collaboration</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Seamlessly work with translators and reviewers using built-in tools. Now working with
            GPT!
          </p>
        </div>
        <div
          class="rounded border border-transparent p-4 transition-colors hover:border-border hover:bg-muted"
        >
          <h3 class="text-lg font-bold">Powerful Management</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Organize your localization projects in projects, by teams.
          </p>
        </div>
        <div
          class="rounded border border-transparent p-4 transition-colors hover:border-border hover:bg-muted"
        >
          <h3 class="text-lg font-bold">Real-time Updates</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Stay informed with instant notifications about project changes and updates. Never miss
            an important update.
          </p>
        </div>
      </div>
    </div>
  </section>
  <Pricing />
  <!-- Add mock reviews --->
</main>
<footer class="bg-gray-900 text-gray-300">
  <div
    class="container grid items-center gap-6 px-4 py-12 md:grid-cols-2 md:gap-8 md:py-24 lg:grid-cols-4 xl:px-6"
  >
    <a class="text-2xl font-bold" href={pathTo('app')}>Lang Hub</a>
    <div class="space-y-4">
      <p class="text-sm leading-7">The modern platform for localization and translation.</p>
    </div>
    <div class="space-y-4">
      <h3 class="text-xl font-bold">Streamline your translation process</h3>
      <ul class="space-y-2">
        <!-- <li><a class="text-gray-300 hover:text-gray-300/70" href="#"> Features </a></li> -->
        <!-- <li><a class="text-gray-300 hover:text-gray-300/70" href="#"> Tour </a></li> -->
        <!-- <li><a class="text-gray-300 hover:text-gray-300/70" href="#"> Contact Us </a></li> -->
      </ul>
    </div>
    <div class="space-y-4">
      <h3 class="text-xl font-bold">Resources</h3>
      <ul class="space-y-2">
        <!-- <li><a class="text-gray-300 hover:text-gray-300/70" href="#"> Documentation </a></li> -->
        <!-- <li><a class="text-gray-300 hover:text-gray-300/70" href="#"> API </a></li> -->
        <!-- <li><a class="text-gray-300 hover:text-gray-300/70" href="#"> GitHub </a></li> -->
      </ul>
    </div>
    <div class="space-y-4"></div>
  </div>
</footer>
