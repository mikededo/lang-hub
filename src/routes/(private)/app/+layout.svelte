<script lang="ts">
  import type { User } from '@supabase/supabase-js';
  import { LogOut, UserRound } from 'lucide-svelte';
  import { fade } from 'svelte/transition';


  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ButtonMenu, MenuItem, ThemeToggler } from '$lib/components';
  import { QUERY_PARAM_KEYS, QUERY_PARAM_VALUES, isAuthRelated, pathTo } from '$lib/config';
  import { ProfileDialog } from '$lib/domain/user';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let fromAuth = false;
  let { supabaseClient, session } = data;

  let user: User | undefined = session?.user;

  afterNavigate(({ from }) => {
    if (isAuthRelated(from?.url.pathname)) {
      fromAuth = true;
      setTimeout(() => {
        fromAuth = false;
      }, 1500);
    }
  });

  const handleOnLogOut = async () => {
    await data.supabaseClient.auth.signOut();
    goto(pathTo('signIn'));
  };

  const handleOnShowProfile = async () => {
    const params = new URLSearchParams($page.url.searchParams.toString());
    params.set(QUERY_PARAM_KEYS.dialog, QUERY_PARAM_VALUES.dialog.profile);
    goto(`${$page.url.pathname}?${params.toString()}`);
  };

  const handleOnUpdateUser = async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        user = data.session.user;
      }
    } catch (error) {
      // TODO: Do something -> Display the error as a bottom banner?
    }
  };
</script>

<div class="min-h-screen w-full bg-background" in:fade={{ delay: fromAuth ? 2500 : 0 }}>
  <header class="border-b border-border">
    <div class="flex items-center justify-between gap-1 px-6 py-4">
      <h1 class="flex-1 text-xl font-bold">LangHub</h1>
      {#if user}
        <p class="mr-2 rounded-xl bg-muted px-3 py-0.5 text-sm">
          {user.user_metadata.firstName}
          {' '}
          {user.user_metadata.lastName}
        </p>
      {/if}
      <ButtonMenu>
        <MenuItem Icon={UserRound} on:click={handleOnShowProfile}>Your profile</MenuItem>
        <MenuItem Icon={LogOut} on:click={handleOnLogOut} destructive>Sign out</MenuItem>
      </ButtonMenu>
      <ThemeToggler theme={data.colorScheme} />
    </div>
  </header>

  <main>
    <slot />
  </main>
</div>

{#if fromAuth}
  <div class="fixed inset-0 z-[index=999] flex items-center" />
  <div
    class="fixed inset-0 z-[index=1000] flex items-center bg-primary"
    in:fade={{ duration: 200 }}
    out:fade
  >
    <p class="m-auto animate-none text-center text-2xl font-semibold text-primary-foreground">
      We are preparing everything<br /> for you 🚀
    </p>
  </div>
  <div
    class="fixed inset-0 animate-pulse bg-[radial-gradient(#BAB0F277_1px,transparent_1px)] [background-size:20px_20px]"
  />
{/if}

{#if user}
  <ProfileDialog {supabaseClient} {user} onSuccessUpdate={handleOnUpdateUser} />
{/if}
