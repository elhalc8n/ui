import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Command, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface CommandItem {
  id: string;
  title: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  className?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  items,
  placeholder = 'Type a command or search...',
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        (item.category && item.category.toLowerCase().includes(lower))
    );
  }, [items, query]);

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredItems.forEach((item) => {
      const cat = item.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [filteredItems]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          selected.onSelect();
          onClose();
        }
      }
    },
    [filteredItems, selectedIndex, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setSelectedIndex(0);
      setQuery('');
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Surface (Layer 3) */}
      <div
        className={cn(
          'relative w-full max-w-xl overflow-hidden rounded-2xl border text-slate-900 dark:text-slate-100',
          'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-slate-200/80 dark:border-white/15',
          'shadow-2xl glass-specular-border z-10 animate-in zoom-in-95 duration-150',
          className
        )}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-200/60 dark:border-white/10">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={placeholder}
            className="w-full h-14 bg-transparent text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none text-slate-900 dark:text-slate-100"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            <Command className="w-2.5 h-2.5" /> ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto glass-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400 dark:text-slate-500">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, catItems]) => (
              <div key={category} className="mb-2 last:mb-0">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {category}
                </div>
                {catItems.map((item) => {
                  flatIndex += 1;
                  const isCurrent = flatIndex === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        item.onSelect();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xl transition-all duration-100 select-none text-left',
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon && (
                          <span
                            className={cn(
                              'w-4 h-4 shrink-0',
                              isCurrent ? 'text-white' : 'text-slate-400'
                            )}
                          >
                            {item.icon}
                          </span>
                        )}
                        <span>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.shortcut && (
                          <kbd
                            className={cn(
                              'px-1.5 py-0.5 text-[10px] font-mono rounded border',
                              isCurrent
                                ? 'bg-indigo-700 border-indigo-500 text-indigo-100'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                            )}
                          >
                            {item.shortcut}
                          </kbd>
                        )}
                        {isCurrent && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

