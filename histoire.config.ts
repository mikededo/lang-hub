import { HstSvelte } from '@histoire/plugin-svelte';
import { defaultColors, defineConfig } from 'histoire';

export default defineConfig({
  plugins: [HstSvelte()],
  storyMatch: ['./src/stories/**/*.story.svelte'],
  theme: {
    title: 'LangHub Design System',
    colors: { primary: defaultColors.indigo },
  },
  setupFile: './src/stories/histoire-setup.ts',
});
