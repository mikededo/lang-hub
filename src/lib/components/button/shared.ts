import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'condensed' | 'default';
export type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
export type SharedButtonProps = { variant?: ButtonVariant; color?: ButtonColor };

const variants: Record<ButtonVariant, string> = {
  condensed: 'py-1 px-2.5 h-unset',
  default: 'px-4 py-2',
};
const colors: Record<ButtonColor, string> = {
  primary:
    'bg-primary dark:bg-primary-800 text-white hover:bg-primary/90 hover:dark:bg-primary-800/90 stroke-white',
  secondary:
    'bg-secondary dark:bg-secondary-900 text-secondary-foreground hover:bg-secondary/80 dark:hover:bg-secondary-900/90 border border-transparent hover:border-secondary-300 dark:hover:border-secondary-700',
  muted: 'bg-transparent text-foreground hover:bg-muted stroke-foreground',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 stroke-destructive',
};

export const sharedClasses = ({
  variant,
  color,
  className,
}: Pick<SharedButtonProps, 'variant' | 'color'> & { className?: string }) =>
  twMerge(
    'focus-visible:ring-ring whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant ?? 'default'],
    colors[color ?? 'primary'],
    className,
  );
