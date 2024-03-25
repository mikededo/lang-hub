<script>
  import { CheckCircle2, ExternalLink } from 'lucide-svelte';

  import { Button } from '$lib/components';
  import { pathTo } from '$lib/config';
</script>

<section class="my-12 flex w-full flex-col gap-14 px-8 md:my-24 lg:my-32 lg:gap-20 lg:px-12">
  <h2 class="text-center text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
  <div class="container mb-12 flex flex-row overflow-hidden rounded">
    <div
      class="border-border flex h-60 w-2/3 shrink-0 flex-col gap-2 rounded-l border border-r-0 p-6"
    >
      <h3 class="text-2xl font-semibold">Not our bussiness!</h3>
      <div class="flex flex-row gap-6">
        <ul>
          <li class="flex gap-2">
            <CheckCircle2 class="mt-1 h-4 w-4 shrink-0 text-green-500" />
            <span>Self hosted, your server, your rules. </span>
          </li>
          <li class="flex gap-2">
            <CheckCircle2 class="mt-1 h-4 w-4 shrink-0 text-green-500" />
            <span class="flex items-baseline gap-0.5">
              Backed by
              <a
                href="https://supabase.com/pricing"
                class="flex items-baseline gap-0.5 font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase <ExternalLink class="h-3 w-3" />
              </a>
            </span>
          </li>
          <li class="flex gap-2">
            <CheckCircle2 class="mt-1 h-4 w-4 shrink-0 text-green-500" />
            <span>Secure by default with RLS and customizable authentication</span>
          </li>
          <li class="flex gap-2">
            <CheckCircle2 class="mt-1 h-4 w-4 shrink-0 text-green-500" />
            <span>Open source project!</span>
          </li>
          <li class="flex gap-2">
            <CheckCircle2 class="mt-1 h-4 w-4 shrink-0 text-green-500" />
            <span>Update the project by updating the main branch</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flex h-60 w-1/3 shrink-0 flex-col justify-center bg-primary p-6 text-center text-white"
    >
      <p class="text-3xl font-bold uppercase">Free.</p>
      <p class="text-3xl font-bold uppercase">For.</p>
      <p class="text-3xl font-bold uppercase">Ever.</p>
      <div class="mt-6">
        <Button href={pathTo('signUp')} color="secondary">Start now!</Button>
      </div>
    </div>
  </div>
</section>
