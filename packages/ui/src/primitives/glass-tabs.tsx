import React from 'react';
import { cn } from '../utils/cn';

export interface GlassTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface GlassTabsProps {
  tabs: GlassTabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'segmented' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlassTabs({
  tabs,
  activeTab,
  onChange,
  variant = 'segmented',
  size = 'md',
  className,
}: GlassTabsProps) {
  const sizeClasses = {
    sm: 'text-xs py-1 px-2.5 rounded-lg gap-1.5',
    md: 'text-sm py-1.5 px-3.5 rounded-xl gap-2',
    lg: 'text-base py-2 px-4 rounded-xl gap-2.5',
  };

  if (variant === 'underline') {
    return (
      <div
        className={cn(
          'flex items-center space-x-6 border-b border-slate-200/60 dark:border-white/10',
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative flex items-center pb-3 font-medium transition-colors outline-none',
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
                tab.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
              {tab.badge && <span className="ml-2">{tab.badge}</span>}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-in fade-in" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // segmented or pills variant
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 rounded-2xl backdrop-blur-md border border-slate-200/80 dark:border-white/10',
        variant === 'segmented'
          ? 'bg-slate-200/50 dark:bg-slate-900/60 shadow-inner'
          : 'bg-white/60 dark:bg-slate-900/40 shadow-sm',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none',
              sizeClasses[size],
              isActive
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-white/10 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && <span>{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

