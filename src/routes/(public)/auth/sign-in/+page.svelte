<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';
  import { Loader2 } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  import type { PageData } from './$types';

  import { goto } from '$app/navigation';
  import { Button, Input } from '$lib/components';
  import { EMAIL_REGEX, PASSWORD_REGEX, pathTo } from '$lib/config';
  import { signInUser } from '$lib/db';
  import type { SignInData } from '$lib/db';

  export let data: PageData;

  const { supabaseClient } = data;
  let validEmail = true;
  let validPassword = true;

  const mutation = createMutation({
    mutationFn: async ({ email, password }: SignInData) =>
      await signInUser(supabaseClient, email, password),
    onSuccess: () => {
      goto(pathTo('app'));
    },
  });

  const handleOnSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const { email, password } = Object.fromEntries(new FormData(form)) as SignInData;

    validEmail = EMAIL_REGEX.test(email);
    validPassword = PASSWORD_REGEX.test(password);

    if (validEmail && validPassword) {
      $mutation.mutate({ email, password });
    }
  };
</script>

<form
  class="flex h-full w-full flex-col items-center justify-center gap-8"
  on:submit|preventDefault={handleOnSubmit}
>
  <div class="flex w-full flex-col items-center gap-2">
    <h1 class="text-3xl font-bold">Welcome back!</h1>
    <p class="text-foreground/75">Log in to your account to continue</p>
  </div>
  <div class="flex w-full flex-col gap-4">
    <Input
      label="Email"
      name="email"
      id="email"
      placeholder="email@example.com"
      invalid={!validEmail}
      type="text"
    />
    <div class="flex w-full flex-col gap-2">
      <Input
        label="Password"
        id="password"
        name="password"
        placeholder="Must be 8 characters long!"
        type="password"
        invalid={!validPassword}
      />
      <a class="ml-auto inline-block text-sm underline" href="/">Forgot your password?</a>
    </div>
  </div>
  <Button className="w-full h-10" type="submit" disabled={$mutation.isPending}>
    <span class="flex items-center justify-center">
      <!--  TODO: Extract into LoadingButton or sth -->
      {#if $mutation.isPending}
        <span transition:slide={{ axis: 'x' }} class="mr-2">
          <Loader2 class="animate-spin" />
        </span>
      {/if}
      <span>Sign in</span>
    </span>
  </Button>
  <hr class="mx-auto w-3/4" />
  <div class="space-y-2 text-sm">
    <p>
      Don't have an account?
      <a class="underline" href={pathTo('signUp')}>Sign up</a>
    </p>
  </div>
</form>
