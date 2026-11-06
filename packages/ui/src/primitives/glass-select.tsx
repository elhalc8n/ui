import React, { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface GlassSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface GlassSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: GlassSelectOption[];
  selectSize?: 'sm' | 'md' | 'lg';
}

export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      selectSize = 'md',
      id: customId,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = customId || generatedId;

    const sizeClasses = {
      sm: 'h-8 pl-3 pr-8 text-xs rounded-xl',
      md: 'h-10 pl-3.5 pr-10 text-sm rounded-xl',
      lg: 'h-12 pl-4 pr-12 text-base rounded-2xl',
    };

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'w-full appearance-none bg-white/65 dark:bg-slate-900/60 backdrop-blur-sm border transition-all duration-150',
              'text-slate-900 dark:text-slate-100 border-slate-200/80 dark:border-white/10 shadow-sm outline-none cursor-pointer',
              'focus:bg-white/90 dark:focus:bg-slate-900/80 focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/15',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[selectSize],
              error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
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

GlassSelect.displayName = 'GlassSelect';

