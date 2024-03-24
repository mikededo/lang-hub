<script lang="ts">
  import type { User } from '@supabase/supabase-js';
  import { createMutation } from '@tanstack/svelte-query';
  import { Loader2 } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Dialog, Input } from '$lib/components';
  import { Banner } from '$lib/components/banner';
  import {
    EMAIL_REGEX,
    NAME_REGEX,
    PASSWORD_REGEX,
    QUERY_PARAM_KEYS,
    QUERY_PARAM_VALUES,
  } from '$lib/config';
  import { getSupabaseClient } from '$lib/context';
  import { type UserData, updateUser } from '$lib/db';

  type UpdateUserData = UserData & { repeatPassword: string };

  export let user: User;
  export let onSuccessUpdate: (() => void) | undefined = undefined;

  let supabaseClient = getSupabaseClient();
  const { firstName, lastName } = user.user_metadata;
  let { email } = user;
  let errorMessage = '';

  let mutation = createMutation({
    mutationFn: async (data: UserData) => {
      const { password, ...restData } = data;
      await updateUser(supabaseClient, {
        ...restData,
        password: password || undefined,
      });
    },
    onSuccess: () => {
      handleOnClose();
      onSuccessUpdate?.();
    },
  });

  $: searchParams = $page.url.searchParams;
  $: showDialog = searchParams.get(QUERY_PARAM_KEYS.dialog) === QUERY_PARAM_VALUES.dialog.profile;

  const handleOnClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(QUERY_PARAM_KEYS.dialog);
    goto(`${$page.url.pathname}?${params.toString()}`);
  };

  const handleOnSubmit = async (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    const { firstName, lastName, email, password, repeatPassword } = Object.fromEntries(
      new FormData(form),
    ) as UpdateUserData;

    const validFirstName = NAME_REGEX.test(firstName);
    const validLastName = NAME_REGEX.test(lastName);
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword =
      !password || (PASSWORD_REGEX.test(password) && password === repeatPassword);
    const validForm = validFirstName && validLastName && validEmail && validPassword;

    if (!validForm) {
      errorMessage = 'Please fill in the fields correctly.';
      return;
    }

    $mutation.mutate({ firstName, lastName, email, password });
  };
</script>

{#if showDialog}
  <Dialog onClose={handleOnClose}>
    <span slot="header">Edit your profile</span>
    {#if errorMessage}
      <Banner class="min-h-10" destructive withTransition>
        <p>{errorMessage}</p>
      </Banner>
    {/if}
    <form class="flex w-full flex-col gap-4" on:submit|preventDefault={handleOnSubmit}>
      <div class="flex gap-2">
        <Input
          label="First name"
          id="first-name"
          name="firstName"
          placeholder="John"
          value={firstName}
        />
        <Input label="Last name" name="lastName" placeholder="Doe" value={lastName} />
      </div>
      <Input label="Email" name="email" placeholder="john.doe@gmail.com" value={email} />
      <Banner>
        <p class="text-center text-xs">
          Leave the password fields empty if you don't want to change them.
        </p>
      </Banner>
      <Input label="New password" name="password" placeholder="Minimum 8 characters" />
      <Input label="Repeat password" name="repeatPassword" placeholder="Minimum 8 characters" />
      <div class="flex items-center justify-end gap-2">
        <Button type="submit" disabled={$mutation.isPending}>
          <span class="flex items-center justify-center">
            {#if $mutation.isPending}
              <span transition:slide={{ axis: 'x' }} class="mr-2">
                <Loader2 class="animate-spin" />
              </span>
            {/if}
            <span>Save</span>
          </span>
        </Button>
        <Button color="secondary" on:click={handleOnClose}>Cancel</Button>
      </div>
    </form>
  </Dialog>
{/if}
