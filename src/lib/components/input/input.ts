import { twMerge } from 'tailwind-merge';

type Props = { invalid?: boolean; className?: string; focusWithin?: boolean };

export const inputClasses = ({ invalid, className, focusWithin }: Props = {}) =>
  twMerge(
    'border-input h-10 w-full rounded border bg-background px-3 py-1 outline-none ring ring-transparent transition-all disabled:cursor-not-allowed disabled:bg-muted',
    focusWithin
      ? 'focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background'
      : 'focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
    invalid && 'border-destructive ring-destructive ring-offset-2 ring-offset-background',
    className,
  );
