import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.html', './src/**/*.svelte', './src/**/*.ts'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      screens: { xl: '1100px', '2xl': '1360px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      height: {
        topbar: 'var(--topbar-height)',
        'editor-topbar': 'var(--editor-topbar-height)',
      },
      minHeight: {
        editor: 'var(--min-editor-height)',
      },
      width: {
        'editor-aside': 'var(--editor-aside-width)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          hover: 'hsl(var(--muted-hover))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        tooltip: {
          DEFAULT: 'hsl(var(--tooltip))',
          foreground: 'hsl(var(--tooltip-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        extra: {
          DEFAULT: 'hsl(var(--extra))',
          foreground: 'hsl(var(--extra-foreground))',
          def: 'hsl(var(--extra-default))',
          green: 'hsl(var(--extra-green))',
          orange: 'hsl(var(--extra-orange))',
          magenta: 'hsl(var(--extra-magenta))',
          red: 'hsl(var(--extra-red))',
          purple: 'hsl(var(--extra-purple))',
        },
      },
    },
    borderRadius: {
      DEFAULT: '0.5rem',
      xl: 'calc(0.5rem + 4px)',
      lg: 'calc(0.5rem + 2px)',
      md: 'calc(0.5rem - 2px)',
      sm: 'calc(0.5rem - 4px)',
      full: '9999px',
    },
  },
  plugins: [],
};
