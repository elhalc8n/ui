import React from 'react';
import { Search, X } from 'lucide-react';
import { GlassInput } from '../primitives/glass-input';
import { cn } from '../utils/cn';

export interface DataTableToolbarProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  selectedCount?: number;
  onClearSelection?: () => void;
  className?: string;
}

export function DataTableToolbar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Filter records...',
  filters,
  actions,
  selectedCount = 0,
  onClearSelection,
  className,
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4',
        className
      )}
    >
      {/* Left: Search & Filter Elements */}
      <div className="flex flex-1 items-center gap-2">
        {onSearchChange && (
          <div className="w-full sm:max-w-xs">
            <GlassInput
              inputSize="sm"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              iconLeft={<Search className="w-3.5 h-3.5" />}
              iconRight={
                searchValue ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="p-0.5 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : null
              }
            />
          </div>
        )}
        {filters}
      </div>

      {/* Right: Selection info & Action buttons */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-indigo-50/70 dark:bg-indigo-950/40 px-2.5 py-1.5 rounded-xl border border-indigo-200/60 dark:border-indigo-800/40">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {selectedCount}
            </span>{' '}
            selected
            {onClearSelection && (
              <button
                type="button"
                onClick={onClearSelection}
                className="text-[11px] underline hover:text-indigo-700 ml-1"
              >
                Clear
              </button>
            )}
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}
