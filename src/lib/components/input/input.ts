import { twMerge } from 'tailwind-merge';

type Props = { invalid?: boolean; className?: string; focusWithin?: boolean };

export const inputClasses = ({ invalid, className, focusWithin }: Props = {}) =>
  twMerge(
    'h-10 bg-background w-full ring ring-transparent border border-input transition-all rounded px-3 py-1 outline-none disabled:bg-muted disabled:cursor-not-allowed',
    focusWithin
      ? 'focus-within:ring-offset-background focus-within:ring-offset-2 focus-within:ring-primary'
      : 'focus:ring-offset-background focus:ring-offset-2 focus:ring-primary',
    invalid && 'ring-offset-background ring-offset-2 ring-destructive border-destructive',
    className,
  );
