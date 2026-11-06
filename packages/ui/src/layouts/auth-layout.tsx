import React from 'react';
import { GlassCard } from '../primitives/glass-card';
import { cn } from '../utils/cn';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  title,
  subtitle,
  logo,
  children,
  footer,
  className,
}: AuthLayoutProps) {
  return (
    <div className="glass-ambient-canvas flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          {logo && <div className="mb-2">{logo}</div>}
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Glass Card Container (Layer 2) */}
        <GlassCard
          padding="lg"
          variant="default"
          glow="indigo"
          className={cn('shadow-xl', className)}
        >
          {children}
        </GlassCard>

        {/* Footer info / links */}
        {footer && (
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

