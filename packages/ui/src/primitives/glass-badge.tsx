import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  withDot?: boolean;
}

export const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      withDot = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default:
        'bg-slate-100/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/60 dark:border-white/10',
      primary:
        'bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/40',
      success:
        'bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/40',
      warning:
        'bg-amber-50/80 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/40',
      danger:
        'bg-rose-50/80 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/40',
      outline:
        'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    };

    const dotColors = {
      default: 'bg-slate-400 dark:bg-slate-500',
      primary: 'bg-indigo-500',
      success: 'bg-emerald-500',
      warning: 'bg-amber-500',
      danger: 'bg-rose-500',
      outline: 'bg-slate-400',
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-[10px] font-medium rounded-md gap-1',
      md: 'px-2.5 py-1 text-xs font-medium rounded-lg gap-1.5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center backdrop-blur-sm border select-none transition-colors',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {withDot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full shrink-0',
              dotColors[variant]
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

GlassBadge.displayName = 'GlassBadge';

