<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';

  import { goto } from '$app/navigation';
  import { Input, LoadingButton } from '$lib/components';
  import { Banner } from '$lib/components/banner';
  import { EMAIL_REGEX, PASSWORD_REGEX, pathTo } from '$lib/config';
  import { signUpUser } from '$lib/db';
  import type { SignUpData } from '$lib/db';

  import type { PageData } from './$types';

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
        goto(pathTo('app'));
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
    <Banner class="-my-3 min-h-10" withTransition>
      <p class="text-destructive">{errorMessage}</p>
    </Banner>
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
  <LoadingButton
    class="h-10 w-full"
    type="submit"
    loading={$mutation.isPending}
    disabled={$mutation.isPending}
  >
    <span>Sign up</span>
  </LoadingButton>
  <hr class="mx-auto w-3/4" />
  <div class="space-y-2 text-sm">
    <p>
      Already have an account?
      <a class="underline" href={pathTo('signIn')}>Sign in</a>
    </p>
  </div>
</form>
