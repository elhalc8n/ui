import React from 'react';
import { Menu, Search, Command } from 'lucide-react';
import { cn } from '../utils/cn';

export interface TopNavbarProps {
  breadcrumbs?: React.ReactNode;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  userMenu?: React.ReactNode;
  className?: string;
}

export function TopNavbar({
  breadcrumbs,
  onMenuClick,
  onSearchClick,
  searchPlaceholder = 'Quick search (Ctrl+K)...',
  actions,
  userMenu,
  className,
}: TopNavbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-6',
        'bg-white/70 dark:bg-slate-900/65 backdrop-blur-md border-b border-slate-200/70 dark:border-white/10 shadow-sm',
        className
      )}
    >
      {/* Left: Mobile Menu + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors lg:hidden"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        {breadcrumbs}
      </div>

      {/* Center / Search Action Trigger */}
      {onSearchClick && (
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
          <button
            type="button"
            onClick={onSearchClick}
            className={cn(
              'w-full flex items-center justify-between px-3.5 py-1.5 text-xs rounded-xl border transition-all duration-150',
              'bg-slate-100/80 hover:bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800/90',
              'text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200',
              'border-slate-200/60 dark:border-white/10 shadow-inner'
            )}
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>{searchPlaceholder}</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-white/10 shadow-xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>
      )}

      {/* Right: Actions & User Avatar/Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onSearchClick && (
          <button
            type="button"
            onClick={onSearchClick}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors md:hidden"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
        {actions}
        {userMenu}
      </div>
    </header>
  );
}

