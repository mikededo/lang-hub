<script lang="ts">
  import { Moon, Sun } from 'lucide-svelte';

  import { browser } from '$app/environment';
  import { PUBLIC_THEME_MODE_COOKIE } from '$env/static/public';

  import { IconButton } from '../icon-button';

  export let theme = 'light';

  const handleOnChange = () => {
    if (!browser) {
      // Just in case
      return;
    }

    const { classList } = document.documentElement;
    const isDark = classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    theme = newTheme;
    classList.add(newTheme);
    classList.remove(isDark ? 'dark' : 'light');
    document.cookie = `${PUBLIC_THEME_MODE_COOKIE}=${newTheme}; path=/; SameSite=Lax; Secure`;

    return;
  };
</script>

<IconButton Icon={theme === 'dark' ? Moon : Sun} color="muted" on:click={handleOnChange} />
