import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GlassCard } from '../primitives/glass-card';
import { cn } from '../utils/cn';

export interface StatMetricCardProps {
  title: string;
  value: string | number;
  change?: number; // e.g. +14.2 or -5.1
  changeLabel?: string; // e.g. "vs last month"
  icon?: React.ReactNode;
  iconGlow?: 'indigo' | 'cyan' | 'rose' | 'emerald';
  chart?: React.ReactNode;
  className?: string;
}

export function StatMetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  iconGlow = 'indigo',
  chart,
  className,
}: StatMetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;

  const glowColors = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  };

  return (
    <GlassCard padding="md" variant="default" className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>
          </div>
        </div>

        {icon && (
          <div
            className={cn(
              'w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs',
              glowColors[iconGlow]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Delta Trend & Comparison */}
      {(change !== undefined || changeLabel) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change !== undefined && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-semibold',
                isPositive &&
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                isNegative &&
                  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                isNeutral &&
                  'bg-slate-500/10 text-slate-600 dark:text-slate-400'
              )}
            >
              {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
              {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
              {isNeutral && <Minus className="w-3.5 h-3.5" />}
              {isPositive ? `+${change}%` : `${change}%`}
            </span>
          )}
          {changeLabel && (
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              {changeLabel}
            </span>
          )}
        </div>
      )}

      {/* Optional Sparkline / Chart Slot */}
      {chart && <div className="mt-4 pt-2">{chart}</div>}
    </GlassCard>
  );
}

