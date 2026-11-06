import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'interactive' | 'solid';
  blur?: 'none' | 'sm' | 'md' | 'lg';
  glow?: 'none' | 'indigo' | 'cyan' | 'rose' | 'emerald';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  specular?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'default',
      blur = 'sm',
      glow = 'none',
      padding = 'md',
      specular = true,
      children,
      ...props
    },
    ref
  ) => {
    const blurClasses = {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    };

    const variantClasses = {
      default:
        'bg-white/60 dark:bg-slate-900/50 border-slate-200/70 dark:border-white/10 shadow-sm dark:shadow-md',
      subtle:
        'bg-white/40 dark:bg-slate-900/30 border-slate-200/50 dark:border-white/5 shadow-none',
      interactive:
        'bg-white/70 hover:bg-white/85 dark:bg-slate-900/55 dark:hover:bg-slate-900/75 border-slate-200/80 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer',
      solid:
        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm',
    };

    const glowClasses = {
      none: '',
      indigo:
        'hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]',
      cyan:
        'hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      rose:
        'hover:shadow-[0_0_25px_rgba(244,63,94,0.2)] dark:hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
      emerald:
        'hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    };

    const paddingClasses = {
      none: 'p-0',
      sm: 'p-3 sm:p-4',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl border text-slate-900 dark:text-slate-100 transition-colors',
          blurClasses[blur],
          variantClasses[variant],
          glowClasses[glow],
          paddingClasses[padding],
          specular && 'glass-specular-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export const GlassCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);
GlassCardHeader.displayName = 'GlassCardHeader';

export const GlassCardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-tight tracking-tight text-slate-900 dark:text-white',
        className
      )}
      {...props}
    />
  )
);
GlassCardTitle.displayName = 'GlassCardTitle';

export const GlassCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
));
GlassCardDescription.displayName = 'GlassCardDescription';

export const GlassCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);
GlassCardContent.displayName = 'GlassCardContent';

export const GlassCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
GlassCardFooter.displayName = 'GlassCardFooter';

