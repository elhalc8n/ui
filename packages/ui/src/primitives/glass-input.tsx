import React, { forwardRef, useId } from 'react';
import { cn } from '../utils/cn';

export interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      iconLeft,
      iconRight,
      inputSize = 'md',
      id: customId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;

    const sizeClasses = {
      sm: 'h-8 px-3 text-xs rounded-xl',
      md: 'h-10 px-3.5 text-sm rounded-xl',
      lg: 'h-12 px-4 text-base rounded-2xl',
    };

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {iconLeft && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full bg-white/65 dark:bg-slate-900/60 backdrop-blur-sm border transition-all duration-150',
              'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'border-slate-200/80 dark:border-white/10 shadow-sm outline-none',
              'focus:bg-white/90 dark:focus:bg-slate-900/80 focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/15',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100/50 dark:disabled:bg-slate-800/50',
              sizeClasses[inputSize],
              iconLeft && 'pl-9 sm:pl-10',
              iconRight && 'pr-9 sm:pr-10',
              error &&
                'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-100',
              className
            )}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 flex items-center text-slate-400 dark:text-slate-500">
              {iconRight}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

