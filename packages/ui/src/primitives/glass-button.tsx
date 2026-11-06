import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  specular?: boolean;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = 'glass',
      size = 'md',
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      specular = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/25 active:bg-indigo-800 border-transparent',
      secondary:
        'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-transparent',
      glass:
        'bg-white/65 hover:bg-white/85 dark:bg-slate-900/60 dark:hover:bg-slate-900/85 backdrop-blur-md border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 shadow-sm hover:shadow-md',
      outline:
        'bg-transparent hover:bg-white/40 dark:hover:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200',
      ghost:
        'bg-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/60 border-transparent text-slate-700 dark:text-slate-300',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-rose-500/25 active:bg-rose-800 border-transparent',
    };

    const sizeClasses = {
      xs: 'h-7 px-2.5 text-xs rounded-lg gap-1.5',
      sm: 'h-8 px-3 text-xs font-medium rounded-xl gap-1.5',
      md: 'h-10 px-4 text-sm font-medium rounded-xl gap-2',
      lg: 'h-11 px-5 text-base font-medium rounded-xl gap-2.5',
      icon: 'h-9 w-9 rounded-xl p-0 justify-center items-center',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium border transition-all duration-150 select-none outline-none',
          'focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          specular && variant === 'glass' && 'glass-specular-border',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

