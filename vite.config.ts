import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(async () => ({
  plugins: [await sveltekit()],
  envPrefix: 'LANG_HUB',
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
}));
