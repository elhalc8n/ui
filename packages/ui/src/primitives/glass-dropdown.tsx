import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../utils/cn';

export interface GlassDropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: Array<GlassDropdownItem | 'divider'>;
  align?: 'left' | 'right';
  className?: string;
}

export function GlassDropdown({
  trigger,
  items,
  align = 'right',
  className,
}: GlassDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[200px] rounded-2xl p-1.5 shadow-xl transition-all',
            'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10',
            'glass-specular-border animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
            className
          )}
        >
          {items.map((item, idx) => {
            if (item === 'divider') {
              return (
                <div
                  key={`div-${idx}`}
                  className="my-1.5 h-px bg-slate-200/60 dark:bg-white/10"
                />
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors select-none text-left',
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed'
                    : item.destructive
                    ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <kbd className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

