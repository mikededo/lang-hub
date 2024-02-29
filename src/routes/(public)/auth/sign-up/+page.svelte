<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';
  import { Loader2 } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';

  import type { PageData } from './$types';

  import { goto } from '$app/navigation';
  import { Button, Input } from '$lib/components';
  import { EMAIL_REGEX, PASSWORD_REGEX } from '$lib/config';
  import { signUpUser } from '$lib/db';
  import type { SignUpData } from '$lib/db';

  export let data: PageData;

  const { supabaseClient } = data;
  let validFirstName = true;
  let validLastName = true;
  let validEmail = true;
  let validPassword = true;

  let errorMessage: string | undefined;

  const mutation = createMutation({
    mutationFn: async (data: SignUpData) => await signUpUser(supabaseClient, data),
    onSuccess: ({ data, error }) => {
      if (error) {
        errorMessage = error.message;
        return;
      }

      if (data.user) {
        goto('/');
      }
    },
  });

  const handleOnSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const { firstName, lastName, email, password } = Object.fromEntries(
      new FormData(form),
    ) as SignUpData;

    validEmail = EMAIL_REGEX.test(email);
    validPassword = PASSWORD_REGEX.test(password);

    if (validEmail && validPassword && firstName && lastName) {
      $mutation.mutate({ firstName, lastName, email, password });
    }
  };
</script>

<form
  class="flex h-full w-full flex-col items-center justify-center gap-8"
  on:submit|preventDefault={handleOnSubmit}
>
  <div class="flex w-full flex-col items-center gap-2">
    <h1 class="text-3xl font-bold">Hi, newcomer!</h1>
    <p class="text-foreground/75">Fill in the fields to create an account!</p>
  </div>
  {#if errorMessage}
    <div
      class="-my-3 min-h-10 w-full rounded-md bg-destructive/10 p-2 text-center text-sm"
      in:fade={{ duration: 100 }}
    >
      <p class="text-destructive">{errorMessage}</p>
    </div>
  {/if}
  <div class="flex w-full flex-col gap-4">
    <Input
      label="First name"
      id="first-name"
      name="firstName"
      placeholder="John"
      type="text"
      invalid={!validFirstName}
    />
    <Input
      label="Last name"
      id="last-name"
      name="lastName"
      placeholder="Doe"
      type="text"
      invalid={!validLastName}
    />
    <Input
      label="Email"
      id="email"
      name="email"
      placeholder="email@example.com"
      type="email"
      invalid={!validEmail}
    />
    <Input
      label="Password"
      id="password"
      name="password"
      placeholder="Must be 8 characters long!"
      type="password"
      invalid={!validPassword}
    />
  </div>
  <Button className="w-full h-10" type="submit" disabled={$mutation.isPending}>
    <span class="flex items-center justify-center">
      {#if $mutation.isPending}
        <span transition:slide={{ axis: 'x' }} class="mr-2">
          <Loader2 class="animate-spin" />
        </span>
      {/if}
      <span>Sign up</span>
    </span>
  </Button>
  <hr class="mx-auto w-3/4" />
  <div class="space-y-2 text-sm">
    <p>
      Already have an account?
      <a class="underline" href="/auth/sign-in">Sign in</a>
    </p>
  </div>
</form>
