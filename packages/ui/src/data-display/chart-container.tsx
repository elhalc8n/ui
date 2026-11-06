import React from 'react';
import { GlassCard } from '../primitives/glass-card';
import { cn } from '../utils/cn';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  height?: number | string;
  className?: string;
}

export function ChartContainer({
  title,
  subtitle,
  actions,
  children,
  footer,
  height = 320,
  className,
}: ChartContainerProps) {
  return (
    <GlassCard padding="md" variant="default" className={cn('flex flex-col', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/50 dark:border-white/10">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 self-start sm:self-auto">{actions}</div>}
      </div>

      {/* Chart Canvas Area */}
      <div
        className="w-full flex-1 pt-5 flex items-center justify-center relative min-h-[220px]"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 text-xs text-slate-500">
          {footer}
        </div>
      )}
    </GlassCard>
  );
}

