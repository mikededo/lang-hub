import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'condensed' | 'default';
export type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
export type SharedButtonProps = { variant?: ButtonVariant; color?: ButtonColor };

const variants: Record<ButtonVariant, string> = {
  condensed: 'py-1 px-2.5 h-unset',
  default: 'px-4 py-2',
};
const colors: Record<ButtonColor, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 stroke-primary-foreground',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent hover:border-secondary-foreground/10',
  muted: 'bg-transparent text-foreground hover:bg-muted-hover stroke-foreground',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 stroke-destructive-foreground',
};

export const sharedClasses = ({
  variant,
  color,
  className,
}: Pick<SharedButtonProps, 'variant' | 'color'> & { className?: string }) =>
  twMerge(
    'whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant ?? 'default'],
    colors[color ?? 'primary'],
    className,
  );
